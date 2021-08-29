import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

import { isLocalhost } from 'services/navigation';

export const database = getDatabase();
if (isLocalhost) connectDatabaseEmulator(database, 'localhost', 9000);
