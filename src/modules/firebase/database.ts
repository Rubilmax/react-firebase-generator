import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

import { isLocalhost } from 'services/navigation';

import { firebaseApp } from '.';

export const database = getDatabase(firebaseApp);
if (isLocalhost) connectDatabaseEmulator(database, 'localhost', 9000);
