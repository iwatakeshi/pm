const ModelValidator = require('./ModelValidator');

class TaskValidator extends ModelValidator {
    static isValidProject(task, project) {
        return ModelValidator.exists(task) &&
            ModelValidator.exists(project) &&
            task.project_id === project.id;
    }
};

module.exports = TaskValidator;