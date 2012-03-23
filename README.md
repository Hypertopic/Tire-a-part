TIRÉ À PART – Digital repository for research papers
====================================================

License: [GNU Affero General Public License](http://www.gnu.org/licenses/agpl.html)

Contact: <aurelien.benel@utt.fr>

Installation requirements
-------------------------

* Git client
* [CouchDB](http://couchdb.apache.org/)
* [CouchApp](https://github.com/jchris/couchapp) 
* HTTP reverse proxy server (for authentication)

Installation procedure
----------------------

* Create a database named ``tire-a-part``at <http://127.0.0.1:5984/_utils>.

* In any folder:

        git clone git://github.com/benel/Tire-a-part.git
        couchapp push http://127.0.0.1:5984/tire-a-part

* Set up your reverse proxy so that other methods than GET requires an authentication (e.g. LDAP).
