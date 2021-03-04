Social Networking Kata
----------------------

Implement the core **domain logic** for a social networking application (similar to Twitter) satisfying the features below.

``` {.sourceCode .gherkin}
Feature: Publishing
   Scenario: Alice publishes messages to her personal timeline.   
      Given Alice has published "I love the weather today."
      When Alice views her timeline
      Then Alice sees:
         "I love the weather today."
      
Feature: Timeline
   Scenario: Alice views Bob's timeline.
      Given Bob has published "Darn! We lost!"
      And Bob has published "Good game though."
      When Alice views Bob's timeline
      Then Alice sees:
         Good game though. (1 minute ago)
         Darn! We lost! (2 minute ago)
      
Feature: Following
   Scenario: Charlie can follow Alice and Bob, and he views an aggregated list of all timelines.
      Given Alice has published "I love the weather today."
      And Bob has published "Darn! We lost!"
      And Bob has published "Good game though."
      And Charlie has published "I'm in New York today! Anyone wants to have a coffee?"
      When Charlie follows Alice
      And Charlie follows Bob
      And Charlie views his wall
      Then Charlie sees:
         Charlie - I'm in New York today! Anyone wants to have a coffee? (15 seconds ago)     
         Bob - Good game though. (1 minute ago)     
         Bob - Damn! We lost! (2 minutes ago)     
         Alice - I love the weather today (5 minutes ago)    
```

----------------------

**Language:** JavaScript

**Dependencies:** jest

**How to Build:** Navigate to katas-master/starter/js and run "$npm i jest" to install jest if needed, then run "$npm run test" to assess the test suite.

**Description:** Using a domain-driven design pattern, I wrote the domain logic for a social networking kata. I chose to use a "User" as the underlying data representation because the functionality required (publishing, viewing, and following) all fell within a typical "User"'s capability. The domain/user folder encapsulates the essential data structure and behaviors needed to implement a "User" and utilizes pure functions for instantiating new immutable "User" states given a parameter. The application/ folder depends on the underlying domain logic and has its infrastructural dependencies injected at runtime, allowing for a clean separation of concerns. The infrastructure/ folder implements the pure functions declared in the domain/user folder and is used to simulate calls from a database with an in-memory storage implementation. I implemented post publishing, timeline viewing, and initial following functionality.
