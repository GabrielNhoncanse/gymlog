import { SQLiteDatabase } from 'expo-sqlite'

export async function initDatabase (db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS training_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );
  `)

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      training_type_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      sets INTEGER NOT NULL,
      observations TEXT,
      FOREIGN KEY (training_type_id) REFERENCES training_types(id) ON DELETE CASCADE
    );
  `)

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      training_type_id INTEGER NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      FOREIGN KEY (training_type_id) REFERENCES training_types(id) ON DELETE CASCADE
    );
  `)

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      load REAL NOT NULL,
      repetitions INTEGER NOT NULL,
      rir INTEGER, -- Reps in Reserve
      observations TEXT,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
    );
  `)
}
