module.exports = {
    rules: {
        required: item => {
            "use strict";
            return !!(item && new String(item).trim().length)
        }
    },
    questions(schema, questions, tree) {
        "use strict";

        questions = questions || [];
        tree = tree || '';

        Object.keys(schema).forEach(key => {
            if (schema[key].hasOwnProperty('required')) {
                let context = schema[key];
                let question = Object.assign(context, {
                    message: context.message || 'Enter ' + key,
                    name: new String(tree + '.' + key).substr(1),
                });


                if (context.required) {
                    context.validate = this.rules.required
                }

                context.validate = context.validate || null;
                return questions.push(question);
            }

            this.questions(schema[key], questions, tree + '.' + key);
        })

        return questions;
    },
    create(serializedObject) {
        "use strict";
        let deserializeObject = {};
        let setNestedValues = function (path, value) {
            var schema = deserializeObject;
            var pList = path.split('.');
            var len = pList.length;
            for (var i = 0; i < len - 1; i++) {
                var elem = pList[i];
                if (!schema[elem]) schema[elem] = {}
                schema = schema[elem];
            }

            schema[pList[len - 1]] = value;
        }

        Object.keys(serializedObject).forEach(key => {
            setNestedValues(key, serializedObject[key]);
        });
        return deserializeObject;
    }
}