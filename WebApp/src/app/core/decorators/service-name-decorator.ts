const ServiceName = (annotation: IServiceUriDecorator): ClassDecorator => {
  return () => {

    var parentTarget = annotation.baseClass;

    parentTarget.prototype[annotation.propName] = annotation.pathApi;

  }

}

export default ServiceName;
