class ModelValidator {
    static exists (model) {
        return model !== null && !!model;
    }
}

module.exports = ModelValidator;