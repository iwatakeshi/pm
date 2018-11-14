'use strict'

const Project = use('App/Models/Project')
const ProjectValidator = require('../../Validators/ProjectValidator');

class ProjectController {
  /**
   * Returns all projects
   */
  async index({ auth }) {
    const user = await auth.getUser();
    return await user.projects().fetch();
  }

  async store({ request, response, auth }) {
    const user = await auth.getUser();
    const { title } = request.all();
    const project = new Project();

    project.fill({
      title,
    });

    await user.projects().save(project);
    return response.status(200)
      .json(project);
  }


  async show({ response, auth, params }) {
    // const user = await auth.getUser();
    const { project_id } = params;

    const project = await Project.find(project_id);

    if (ProjectValidator.exists(project)) {
      return response.status(200)
        .json(project)
    }

    return response.status(404)
      .json({
        error: 'Resource does not exist.'
      });

  }

  async update({ request, response, auth, params }) {
    const user = await auth.getUser();
    const { project_id } = params;

    const project = await Project.find(project_id);

    if (ProjectValidator.exists(project)) {

      if (ProjectValidator.isValidOwner(project, user)) {

        project.merge(request.only('title'));
        await project.save();

        return response.status(200)
          .json(project);
      }

      return response.status(403)
        .json({
          error: 'Unauthorized operation.'
        });

    }

    return response.status(404)
      .json({
        error: 'Resource does not exist.'
      });

  }

  async destroy({ response, auth, params }) {
    const user = await auth.getUser();
    const { project_id } = params;
    const project = await Project.find(project_id);

    if (ProjectValidator.exists(project)) {

      if (ProjectValidator.isValidOwner(project, user)) {
        await project.delete();
        return response.status(200)
          .json(project);
      }

      return response.status(403)
        .json({
          error: 'Unauthorized operation.'
        });
    }

    return response.status(404)
      .json({
        error: 'Resource does not exist.'
      });
  }
}

module.exports = ProjectController
