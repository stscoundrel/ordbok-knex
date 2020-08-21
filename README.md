# Orðbók Knex

[Old Norse](https://en.wikipedia.org/wiki/Old_Norse) dictionary for Node.js. SQL implementation with [Knex.js](http://knexjs.org/).

Uses [Orðbók](https://github.com/stscoundrel/old-norse-ordbok) for dictionary data.


### Install

`yarn add ordbok-knex`

You also need to install the database driver you're going to use with Knex.

```
npm install pg
npm install sqlite3
npm install mysql
npm install mysql2
```

### Usage

Orðbók-knex offers two methods: one for setting up new database, and one for getting Knex instance tied to them. Under the hood Orðbók is used to scrape the dictionary with Puppeteer.

##### Setting up the database
```javascript
const { createDB } = require('ordbok-knex')

// Your Knew config. DO NOT define migrations folder.
const knexConf = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './local.db',
  },
  pool: {
    afterCreate: (conn, cb) => {
      conn.run('PRAGMA foreign_keys = ON', cb);
    },
  },
}

// Run only once to create & populate the database.
try {
    const res = await createDB(knexConf)
  } catch (err) {
    console.log(err)
  }
```

##### Queries

```javascript
const { getKnex } = require('ordbok-knex')

/**
 * Setup Knex.
 * You can also do this step withour Orðbók.
 */
const knexConf = { // Your config }
const knex = await getKnex(knexConf)

// Any valid Knex query. 
const result = await knex('norse')
    .where({ startsWith: 'ó' })

const result2 = await knex('english')
    .where({ startsWith: 's' })

console.log(result)
console.log(result2)

knex.destroy()
```

### Sources

Scraped from word list compiled by [Vikings of Bjornstad](https://www.vikingsofbjornstad.com/Old_Norse_Dictionary_E2N.shtm). The sources for the compiled list come from:

- A. Richard Diebold Center for Indo-European Language and Culture, Linguistics Research Center, The University of Texas at Austin, Old Norse Online Base Form Dictionary, Jonathan Slocum and Todd B. Krause, http://www.utexas.edu/cola/depts/lrc/eieol/norol-BF.html
- E.V. Gordon, An Introduction to Old Norse, Oxford University Press; 2 edition (July 23, 1981), ISBN 9780198111849
- Jesse L. Byock, Viking Language 1, Jules William Press, © 2013, ISBN 9781480216440
- Ross G. Arthur, English-Old Norse Dictionary, www.yorku.ca/inpar/language/English-Old_Norse.pdf
- Jackson Crawford, YouTube Old Norse lecture series, Instructor of Nordic Studies and Nordic Program Coordinator, University of Colorado, Boulder
- Regia Anglorum: Mik Lawson: miklawson@yahoo.co.uk, http://www.mun.ca/mst/heroicage/issues/8/sayers.html
- The Society for Creative Anachronism: http://www.housebarra.com/EP/ep04/12norsecurse.html
- https://www.vikingeskibsmuseet.dk/en/professions/education/knowledge-of-sailing/the-ships-crew/crewmembers-in-the-viking-age/barber-surgeon