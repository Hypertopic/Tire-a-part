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

* Create a database named ``tire-a-part`` at <http://127.0.0.1:5984/_utils>.

* In any folder:

        git clone git@github.com:benel/Tire-a-part.git
        cd Tire-a-part
        couchapp init
        couchapp push http://127.0.0.1:5984/tire-a-part

* The application should be now accessible at <http://127.0.0.1:5984/tire-a-part/_design/tire-a-part/_rewrite/>.

* Set up your reverse proxy so that:
 * the visible URL is more simple,
 * other methods than GET requires an authentication (e.g. LDAP).

Tests requirements
------------------

* Ruby
* [Install QT](https://github.com/thoughtbot/capybara-webkit/wiki/Installing-Qt-and-compiling-capybara-webkit)

Note: If you're on MacOS X, [change your `PATH`](http://stackoverflow.com/a/14138490/1121345) so that `gem` refers to brew's gem rather than to system's brew.

Tests installation procedure
---------------------------

* In any folder :

        sudo gem install capybara capybara-webkit rspec

Tests running
-------------

        rspec spec/features/*

