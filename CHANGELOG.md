# workouts changelog #

# 2.1.0
 - Routines tab added
 - New routines can be created (barebone)
 - Routines can be viewed (barebone)

# 2.0.0
 - Shifted back to old way of working due to speedier round time results
 - Setup mock-backend to test server responses and skipping server side work for now

# 1.1.0
 - Added Registration
 - Added Login
 - Added resolve guards to /register and /login
 - Added jwt

# 1.0.1
 - Added prereqs based on Steven Low's recommendations
 - Added link in credits section to Steven Low's website
 - Updated styling of difficulty label to be more apparent

# 1.0.0
 - Release candidate

# 0.5.2
 - Fixed background colors different from each other
 - Cleaned up styling of updates tab
 - Fixed tooltip not hovering in the correct spot
 - Fixed tooltip so code only gets run when element is hovered over

#0.5.1
 - Added back tooltip on hover

#0.5.0
 - Rebuilt the app from the ground up due to inability to deploy to heroku
 - Added credits
 - Added updates

#0.4.1
 - Fixed navigation bar so it does not get refreshed when clicking on one of the links

#0.4.0
 - Added hover on exercise elements
 - Added paths between exercise and its prerequisites
 - Added navigation bar
 - Added tooltip based on ng-bootstrap

#0.3.3
 - Updated css
 - Shifted footer so that it will not block text
 - Fixed footer's background overflowed by the background

#0.3.2
 - Fixed data returning in a different format

#0.3.1
 - Extracted Steven Low's progressions into a database
 - Added sqlite
 - Modified express routes to read from sqlite database

#0.3.0
 - Allowed for left and right clicks on exercise components
 - Added a point system for each exercise
 - Updated exercise prerequisites to point at actual elements
 - Disabled exercises unless prerequisites are completed
 
#0.2.0
 - Added express
 - Added two routes: /api/exercises and /api/name-mapping and changed services to point to those instead of reading from file
 
#0.1.1
 - Used bootstrap css to display exercise as columns
 
#0.1.0
 - Exercises are displayed as lists
 - Added mock exercises

#0.0.1
 - Generated a base skeleton
