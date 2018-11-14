'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route
  .group(() => {
    /**
     * ==========
     *   Users
     * ==========
     */
    Route.post('/signup', 'UserController.signup');
    Route.post('/signin', 'UserController.signin');
    Route.post('/signout', ({ request }) => ({
      message: 'You signed out!'
    }));
  
  })
  .prefix('auth');

Route
  .group(() => {

    /**
     * ==========
     *  Projects
     * ==========
     */
    Route.get('projects', 'ProjectController.index').middleware('auth');
    Route.post('projects', 'ProjectController.store').middleware('auth');

    Route.get('projects/:project_id', 'ProjectController.show').middleware('auth');
    Route.patch('projects/:project_id', 'ProjectController.update').middleware('auth');
    Route.delete('projects/:project_id', 'ProjectController.destroy').middleware('auth');


    /**
     * ==========
     *   Tasks
     * ==========
     */

     Route.get('projects/:project_id/tasks', 'TaskController.index').middleware('auth');
     Route.post('projects/:project_id/tasks', 'TaskController.store').middleware('auth');
     
     Route.get('projects/:project_id/tasks/:task_id', 'TaskController.show').middleware('auth');
     Route.patch('projects/:project_id/tasks/:task_id', 'TaskController.update').middleware('auth');
     Route.delete('projects/:project_id/tasks/:task_id', 'TaskController.destroy').middleware('auth');

  })
  .prefix('api/v1');
