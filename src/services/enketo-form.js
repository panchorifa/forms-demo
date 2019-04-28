import $ from 'jquery';
import {Form} from 'enketo-core/src/js/form';

export const bindDataToModel = (model, data) => {
  // console.log('-------------------------------------1');
  // console.log(model)
  // console.log('-------------------------------------2');
  // console.log(data)
  // console.log('-------------------------------------3');

  const xmlModel = $($.parseXML(model));
  const bindRoot = xmlModel.find('model instance').children().first();
  if (data) {
    const bindJsonToXml = (elem, data, childMatcher) => {
      const findCurrentElement = (elem, name, childMatcher) => {
        return childMatcher ? elem.find(childMatcher(name)) : elem.children(name);
      };
      Object.keys(data).map(key => [key, data[key]])
        .forEach(function(pair) {
          const current = findCurrentElement(elem, pair[0], childMatcher);
          const value = pair[1];
          if (typeof value === 'object') {
            if(current.children().length) {
              bindJsonToXml(current, value);
            } else {
              current.text(value._id);
            }
          } else {
            current.text(value);
          }
        });
    };
    bindJsonToXml(bindRoot, data, function(name) {
      return '>%, >inputs>%'.replace(/%/g, name);
    });
  }
  const res = new XMLSerializer().serializeToString(bindRoot[0]);
  // console.log(res);
  // console.log('-------------------------------------4');
  return res;
};

class EnketoForm {
  constructor(element, model, content, external=undefined) {
    const options = {
      modelStr: model,
      instanceStr: bindDataToModel(model, content),
      external: undefined
    };
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log(element);
    // console.log(options);
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    this.form = new Form(element, options);
    const errors = this.form.init();
    if (errors && errors.length) {
      console.log('Form Errors', JSON.stringify(errors));
    }
  }
}

export default EnketoForm;
