const ModelValidator = require('./ModelValidator');

class ProjectValidator extends ModelValidator {
    static isValidOwner(project, user) {
        return ModelValidator.exists(project) &&
            ModelValidator.exists(user) &&
            (project.user_id === user.id);
    }
};

module.exports = ProjectValidator;