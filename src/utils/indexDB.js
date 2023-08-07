class IndexDb {
  constructor() {
    this.indexedDB = window.indexedDB
    this.db = null
  }

  /**
   * Открытие соединения с базой и создание новой коллекции если она не создана
   * @param {String} dbName название базы
   * @param {Number} verstion версия базы
   * @param {Function} callBack функция которая будет вызваться после открытия соединения в которой будет проверяться
   * на наличие и создаваться новая коллекция
   * -- if (!db.objectStoreNames.contains(listName)) db.createObjectStore(listName, { keyPath: "id" });
   */
  open = (dbName, verstion, callBack) => {
    return new Promise((resolve, reject) => {
      this.indexedDB = window.indexedDB.open(dbName, verstion)

      this.indexedDB.onupgradeneeded = () => {
        this.db = this.indexedDB.result
        callBack && callBack(this.db)
      }

      this.indexedDB.onerror = (e) => {
        reject(e)
      }

      this.indexedDB.onsuccess = (ev) => {
        this.db = this.indexedDB.result

        this.db.onversionchange = () => {
          this.db.close()
          alert('База данных устарела, пожалуста, перезагрузите страницу.')
        }

        resolve(ev.target.result)
      }
    })
  }

  /**
   * Добавление элемента в коллекцию
   * @param item Добавляемый элемент
   * @param {String} listName Название коллекции
   */
  add = (item, listName) => {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction([listName], 'readwrite')
      const store = transaction?.objectStore(listName)
      const addRequest = store?.add(item)

      if (addRequest) {
        addRequest.onsuccess = () => {
          resolve()
        }

        addRequest.onerror = (err) => {
          reject(err)
        }
      } else reject(this.indexedDB.error)
    })
  }

  /**
   * Получение коллекции
   * @param {String} listName Название коллекции
   */
  getAll = (listName) => {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction([listName], 'readonly')
      const objectStore = transaction?.objectStore(listName)
      const getReq = objectStore?.getAll()

      if (getReq) {
        getReq.onsuccess = (ev) => {
          resolve(ev.target.result)
        }

        getReq.onerror = (err) => {
          reject(err)
        }
      } else reject(this.indexedDB.error)
    })
  }

  /**
   * Удаление базы данных
   * @param {String} dbName Название базы
   */
  deleteDB = (dbName) => {
    return new Promise((resolve, reject) => {
      const deleteRequest = this.indexedDB.deleteDatabase(dbName)

      deleteRequest.onsuccess = () => {
        resolve()
      }

      deleteRequest.onerror = () => {
        reject(new Error('Ошибка удаления базы'))
      }
    })
  }

  /**
   * Удаление коллекции из базы данных
   * @param {String} listName Название коллекции
   */
  deleteList = (listName) => this.db.deleteObjectStore(listName)

  /**
   * Очищение коллекции
   * @param {String} listName Название коллекции
   */
  clearList = (listName) => {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction([listName], 'readwrite')
      const objectStore = transaction.objectStore(listName)
      const clearRequest = objectStore.clear()

      clearRequest.onerror = (err) => reject(err)
      clearRequest.onsuccess = () => resolve()
    })
  }

  /**
   * Удаление элемента из коллекции по ключу
   * @param {String} listName Название коллекции
   * @param {String} key ключ элемента
   */
  delete = (listName, key) => {
    return new Promise((resolve, reject) => {
      const transaction = this.db?.transaction([listName], 'readwrite')
      const objectStore = transaction.objectStore(listName)
      const deleteRequest = objectStore.delete(key)

      deleteRequest.onerror = (err) => reject(err)
      deleteRequest.onsuccess = () => resolve()
    })
  }

  // deleteRange = (listName, ...keys) => {
  //   const keyRangeValue = IDBKeyRange.bound(...keys)
  //   return this.delete(listName, keyRangeValue)
  // }
}

export default new IndexDb()
