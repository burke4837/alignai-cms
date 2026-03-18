import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()

async function test() {
  const connectionString = process.env.DATABASE_URL
  console.log('Connecting to:', connectionString?.split('@')[1])
  
  const pool = new Pool({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    const client = await pool.connect()
    console.log('Successfully connected to PG!')
    const res = await client.query('SELECT version()')
    console.log(res.rows[0])
    client.release()
  } catch (err) {
    console.error('Connection error:', err)
  } finally {
    await pool.end()
  }
}

test()
