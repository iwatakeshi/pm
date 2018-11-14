'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const ProjectValidator = require('../../Validators/ProjectValidator');
const TaskValidator = require('../../Validators/TaskValidator');

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response, params, auth }) {
    const user = await auth.getUser();
    const { project_id } = params;

    const project = await Project.find(project_id);


    if (ProjectValidator.exists(project)) {

      if (ProjectValidator.isValidOwner(project, user)) {
        return response.status(200)
          .json(await project.tasks().fetch());
      }

      return response.status(403)
        .json({
          error: 'Unauthorized operation.'
        })

    }

    return response.status(404)
      .json({
        error: 'Resource does not exist.'
      })


  }

  // }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params, auth }) {
    const user = await auth.getUser();
    const { description } = request.all();
    const { project_id } = params;
    const project = await Project.find(project_id);

    if (ProjectValidator.exists(project)) {

      if (ProjectValidator.isValidOwner(project, user)) {
        const task = new Task();
        task.fill({ description });

        await project.tasks().save(task);
        return response.status(200)
          .json(task);
      }

      return response.status(403)
        .json({
          error: 'Unauthorized operation.'
        })
    }

    return response.status(404)
      .json({
        error: 'Resource does not exist.'
      })

  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, response, auth }) {
    // Get the user
    const user = await auth.getUser();
    // Get the project id from URL.
    const { project_id, task_id } = params;
    console.log(params);

    // Find the project using the project id.
    const project = await Project.find(project_id);

    // Make sure the project exists
    if (ProjectValidator.exists(project)) {
      // Make sure that the user owns the project
      if (ProjectValidator.isValidOwner(project, user)) {

        // Get the task
        const task = await Task.find(task_id);
        // Make sure the task exists
        if (TaskValidator.exists(task)) {

          // Make sure that the project owns the task
          if (TaskValidator.isValidProject(task, project)) {

            // We found the task
            return response.status(200)
              .json(task);
          }

          // The project does not own the task
          return response.status(403)
            .json({
              error: 'Unauthorized operation.'
            })

        }

        // We didn't find the task
        return response.status(404)
          .json({
            error: 'Resource does not exist.'
          });

      }

      // The user does not own the project
      return response.status(403)
        .json({
          error: 'Unauthorized operation.'
        })
    }

    // We didn't find the project
    return response.status(404)
      .json({
        error: 'Resource does not exist.'
      })

  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    // Get the user
    const user = await auth.getUser();
    // Get the project id from URL.
    const { project_id, task_id } = params;

    // Find the project using the project id.
    const project = await Project.find(project_id);

    // Make sure the project exists
    if (ProjectValidator.exists(project)) {
      // Make sure that the user owns the project
      if (ProjectValidator.isValidOwner(project, user)) {

        // Get the task
        const task = await Task.find(task_id);
        // Make sure the task exists
        if (TaskValidator.exists(task)) {

          // Make sure that the project owns the task
          if (TaskValidator.isValidProject(task, project)) {

            // Update the description
            task.merge(request.only(['description', 'completed']));
            // Save it to the database
            await task.save();

            // We found the task
            return response.status(200)
              .json(task);
          }

          // The project does not own the task
          return response.status(403)
            .json({
              error: 'Unauthorized operation.'
            })

        }

        // We didn't find the task
        return response.status(404)
          .json({
            error: 'Resource does not exist.'
          });

      }

      // The user does not own the project
      return response.status(403)
        .json({
          error: 'Unauthorized operation.'
        })
    }

    // We didn't find the project
    return response.status(404)
      .json({
        error: 'Resource does not exist.'
      })
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    // Get the user
    const user = await auth.getUser();
    // Get the project id from URL.
    const { project_id, task_id } = params;

    // Find the project using the project id.
    const project = await Project.find(project_id);

    // Make sure the project exists
    if (ProjectValidator.exists(project)) {
      // Make sure that the user owns the project
      if (ProjectValidator.isValidOwner(project, user)) {

        // Get the task
        const task = await Task.find(task_id);
        // Make sure the task exists
        if (TaskValidator.exists(task)) {

          // Make sure that the project owns the task
          if (TaskValidator.isValidProject(task, project)) {

            // Remove it from the database
            await task.delete();

            // We found the task
            return response.status(200)
              .json(task);
          }

          // The project does not own the task
          return response.status(403)
            .json({
              error: 'Unauthorized operation.'
            })

        }

        // We didn't find the task
        return response.status(404)
          .json({
            error: 'Resource does not exist.'
          });

      }

      // The user does not own the project
      return response.status(403)
        .json({
          error: 'Unauthorized operation.'
        })
    }

    // We didn't find the project
    return response.status(404)
      .json({
        error: 'Resource does not exist.'
      })
  }
}

module.exports = TaskController