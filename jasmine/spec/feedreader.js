/* feedreader.js */

$(function() {
    // RSS feed tests 
    describe('RSS Feeds', function() {
        //Make sure that the allFeeds variable is defined and that it's not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


       //Test each feed has a URL
        it('have links', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        //Test each field has a name
        it('have names', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });        
    });


    // Testing the Menu
    describe('The Menu', function() {

        //Test menu is hidden by default
        let body = document.querySelector('body'), 
            menuIcon = document.querySelector('.menu-icon-link');

        it('is hidden by default', function(){
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
        });

        //Test clicking the menu icon shows and hides the menu
        it('appears and hides on click', function(){
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

   
    describe('Initial Entries', function() {

        //Test that the feed loads 
        beforeEach(function(done){
            loadFeed(0, function() {
                done();
            });
        });

        it('have at least one .entry in the .feed container', function(done){
            
            expect(document.querySelector('.feed').querySelector('.entry')).not.toBe(null);

            done();
        });

    });


    describe('New Feed Selection', function() {

        //Test that content changes when new feed is loaded
        let originalContent, updatedContent;

        //get the first element of the currect feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                originalContent = document.querySelector('.feed').firstElementChild.href;
                    loadFeed(1, function(){
                    done();
                });
            });
            
        });

        it('updates the content', function(done) {
            updatedContent = document.querySelector('.feed').firstElementChild.href;
            expect(updatedContent).not.toEqual(originalContent);
            done();

        });

    });

}());
