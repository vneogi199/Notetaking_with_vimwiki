## Files:

* e2e: code for end to end testing
* node\_modules: dependencies from package.json are installed here
* src: main source code
	* app:
	* index.html: single page served by browser
	* main.ts
	* styles.css
	* polyfills.ts
* angular.json: project config
* package.json:
	* dependencies: third party libraries that project needs to run correctly
	* devDependencies: required only for development

## Bootstrapping the application:

1. **main.ts** calls **AppModule(app.module.ts)**
2. **app.module.ts** contains **@NgModule** which contains **bootstrap array** which defines the components that Angular must know before initializing index.html
3. **bootstrap array** contains **AppComponent(app.component.ts)**
4. **app.component.ts** contains **@Component** which contains **selector** which defines the tag where **template/templateUrl** will be injected
