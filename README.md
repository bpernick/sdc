System Design Capstone
This is a back-end optmoization performed on a legacy codebase. The original codebase (using a mySQL database) was refactored to use Postgres or Mongo. Both databases were optimized to handle large datasets (10 million primary and 30 million secondary records) and high request volumes (500 rps for 30 seconds).

Contributors
Ben Pernick

Tech Stack
Postgres, Mongo, Node/Express, artillery.io.

Technical Challenges / Research

The dataset was too big to query without indexing, and different indexing strategies were used in each of the two databases. With the noSQL database, indexing the outermost keys was sufficient to make the database functional. Although more indexing could have been done, this is a tradeoff as indexing in Mongo is far more memory-intensive than the same operation in other databases.

Since the schema used in Postgres was heavily relational, the primary keys and all foreign keys had to be indexed in order to make the database function correctly.

The next big challenge was increasing response speed. Once functional, the server was able to handle roughly 250 RPS without erroring, regardless of which database was connected. RPS speed was increased above 500 for both connections by increasing the max pool size from 5 to 20 in Mongo, and using pools instead of single client connections in Postgres.

What additional features do you plan to add, how do you plan to implement those features?
- Refactoring Postgres database to avoid joins could double query speed
- Deploying multiple server instances and load-balancing them could siginificantly improve response time