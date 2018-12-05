'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
    projects() {
        return this.belongsTo('App/Models/Project')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Task
