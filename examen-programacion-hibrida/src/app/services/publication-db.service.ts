import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Publication } from '../models/publication-model';

@Injectable({
  providedIn: 'root'
})
export class PublicationDbService {

  //Variables needed for starting the DB plugin.
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  platform: string = ""
  initiated:boolean = false 
  db!: SQLiteDBConnection
  DB_NAME: string = "publications_table"
  DB_ENCRYPTION: boolean = false
  DB_MODE: string = "no-encryption"
  DB_VERSION: number = 1
  DB_READ_ONLY: boolean = false

  //Variables that save the names of table components.
  TABLE_NAME: string = "publications_table"
  COL_ID: string = "id"
  COL_TITLE_SQL: string = "title"
  COL_IMAGE_SQL: string = "image"
  COL_DESCRIPTION_SQL: string = "description"
  COL_DATE_SQL: string = "date"

  //String with SQL table creation command.
  DB_SQL_TABLES: string = `
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      ${this.COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.COL_TITLE_SQL} TEXT NOT NULL,
      ${this.COL_IMAGE_SQL} TEXT NOT NULL,
      ${this.COL_DESCRIPTION_SQL} TEXT NOT NULL,
      ${this.COL_DATE_SQL} TEXT NOT NULL
    );`

  constructor() { }

  //Method to start local DB plugin.
  async startPlugin() { 
    try {
      console.log("DbService::initiatePlugin")
      this.platform = Capacitor.getPlatform()
  
      console.log("DbService::initiatePlugin plataform="+this.platform)
      if(this.platform == "web") {        
        await customElements.whenDefined('jeep-sqlite')        
        const jeepSqliteEl = document.querySelector('jeep-sqlite')
        if(jeepSqliteEl != null) {
          console.log("DbService::initiatePlugin::initWebStore")
          await this.sqlite.initWebStore()
        }
      }
  
      console.log("sqlite::createConnection()")
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRYPTION,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
      console.dir(this.db)    
  
      console.log("db.open()")      
      const ret = await this.sqlite.checkConnectionsConsistency()
      const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;      
      if (ret.result && isConn) {
        this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
      } else {
        this.db = await this.sqlite.createConnection(this.DB_NAME, this.DB_ENCRYPTION, this.DB_MODE, this.DB_VERSION, this.DB_READ_ONLY);
      }    

      await this.db.open() 
      console.dir(this.db)    
  
      console.log("db.execute(SQL_TABLES)")
      console.log(this.DB_SQL_TABLES)
      await this.db.execute(this.DB_SQL_TABLES)
  
      if(this.platform == "web") {
        console.log("DbService::initiatePlugin::saveStore()")
        await this.sqlite.saveToStore(this.DB_NAME)
      }
      this.initiated = true 
    } catch(e) {
      console.error(e)
    }
  }

  //Adds a publication to local DB based on object Publication received.
  async addPublication(publicationReceived: Publication) { 
    console.log(publicationReceived)
    const sqlINSERT = `INSERT INTO ${this.TABLE_NAME}
                      (${this.COL_TITLE_SQL}, ${this.COL_IMAGE_SQL}, ${this.COL_DESCRIPTION_SQL}, ${this.COL_DATE_SQL})
                      VALUES (?, ?, ?, ?)`
    
    await this.db.run(sqlINSERT, [publicationReceived.title, publicationReceived.image, publicationReceived.description, publicationReceived.date.toISOString()])
  }

  //Gets the list of publications stored on local DB.
  async getPublicationList(): Promise<Publication[]> { 
    const sqlSELECT = `SELECT * FROM ${this.TABLE_NAME}`
    const getPublicationListQuery = await this.db.query(sqlSELECT)
    return getPublicationListQuery?.values ?? []
  }

  //Deletes a publication from local DB based on id received.
  async deletePublication(id: number){ 
    const sqlDELETE = `DELETE FROM ${this.TABLE_NAME} WHERE ${this.COL_ID} = ?`
    await this.db.run(sqlDELETE, [id])
  }
}
