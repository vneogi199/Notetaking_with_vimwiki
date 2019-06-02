# Angular Notes

## Angular-cli

Installation:

```console

npm install -g @angular/cli
```

Create Angular starter project:

```console
ng new <appname>
```

Generate new component:

```console
ng generate component <componentname>
```

or

```console
ng g c <componentname>
```

## Files

* **e2e**: code for end to end testing
* **node\_modules**: dependencies from package.json are installed here
* **src**: main source code
  * **app**: components and modules in application
  * **index.html**: single page served by browser
  * **main.ts**: defines main module in application
  * **styles.css**: application-wide styles
  * **polyfills.ts**: browser polyfills and application imports
* **angular.json**: project config
* **package.json**:
  * **dependencies**: third party libraries that project needs to run correctly
  * **devDependencies**: required only for development

## Bootstrapping the application

1. **main.ts** calls **AppModule(app.module.ts)**
2. **app.module.ts** contains **@NgModule decorator** which contains **bootstrap array** which defines the components that Angular must know before initializing index.html
3. **bootstrap array** contains **AppComponent(app.component.ts)**
4. **app.component.ts** contains **@Component decorator** which contains **selector** which defines the tag where **template/templateUrl** will be injected

## Components

Each component has it's own HTML, styling and business logic. It helps to split a complex application into reusable parts.

Eg: Header area, Main area, Sidebar, etc can be components.

Each component must have it's own folder and component name must be equal to folder name.

Naming component files: `<componentname>.component.ts`  
Eg: server.component.ts

Naming component classes: `<Componentname>Component`
Eg: ServerComponent

Sample component:

```typescript
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})

export class ServerComponent{

}
```

Here, **templateUrl/template is compulsory.**

Selector can also be an **attribute** on an HTML element.  
Eg:

```typescript
selector: '[app-servers]'
```

```html
<div app-servers></div>
```

Selector can also be a **class** of an HTML element.  
Eg:

```typescript
selector: '.app-servers'
```

```html
<div class="app-servers"></div>
```

Selecting by id is not supported by Angular.
Pseudo selectors like hover also are not supported.

## Decorators

Decorators are used to enhance elements in our code.
Eg: `@Component` is a decorator.

## Modules

Angular uses components to build webpages and modules to bundle different pieces into packages.
Modules have `@NgModule` decorator which contain following properties:

* **declarations**: defines all components within the Angular application
* **imports**: imports other built-in/user-defined modules
* **providers**: ? //TODO
* **bootstrap**: which component will be used to bootstrap the application

## Directives

Directives are instructions in the DOM (HTML). Directives can be with template or without template.

Eg: `<app-servers></app-servers>` is a directive with a template.  
`<p appTurnGreen>Receives a green background` is a directive without template.

### \*ngIf

\*ngIf works like an if statement.* indicates that it is a structural directive which means it will modify the DOM.
Eg:

```html
<p *ngIf="serverCreated">{{ serverCreationStatus }}</p>
```

Here, we check whether the value of `serverCreated` is true or false and based on this, the `<p>` element is shown.

If we want to also perform an else condition here we can use:

```html
<p *ngIf="serverCreated; else noServer">{{ serverCreationStatus }}</p>
<ng-template #noServer>
  <p>No server was created</p>
</ng-template>
```

### ngStyle

ngStyle is an attribute directive. ngStyle allows us to change styling of elements.

```html
<p [ngStyle]="{backgroundColor: getColor()}">The Server with ID {{ serverId }} is {{ getServerStatus() }}</p>
```

Here, we are performing property binding to ngStyle property of ngStyle attribute.

```typescript
getColor(){
  return this.serverStatus == "online" ? "green" : "red";
}
```

Changes background color of `<p>` based on whether `serverStatus` is `online` or `offline`.

### ngClass

ngClass is an attribute directive. ngClass allows us to dynamically add or remove CSS classes.

```html
<p
[ngClass] = "{ online : serverStatus === 'online' }"
>
The Server with ID {{ serverId }} is {{ getServerStatus() }}
</p>
```

```typescript
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online{
      color: white;
    }
  `]
})
```

Binds `online` class if `serverStatus` is `online`.

### \*ngFor

\*ngFor is a structural directive. It helps to loop through values in an array.

```typescript
servers = ['Test server', 'Test server 2'];
onCreateServer() {
  this.serverCreated = true;
  this.servers.push(this.serverName);
  this.serverCreationStatus = 'Server was created with name ' + this.serverName;
}
```

```html
<app-server *ngFor="let server of servers; let i=index">
<!-- Use i here -->
</app-server>
```

Here, we loop through array `servers` and display `<app-server>` tag based for each `server`.

### ng-template

ng-template is an built in directive. It allows us to mark places in the DOM.

```html
<ng-template #noServer>
  <p>No server was created</p>
</ng-template>
```

## Data binding

Data Binding is communication between Typescript code (Business Logic) and Template (HTML).

### String Interpolation

In TS:

```typescript
export class ServerComponent{
  serverId: number = 10;
  serverStatus: string = 'offline';
  
  getServerStatus(){
    this.serverStatus = 'online';
    return this.serverStatus;
  }
}
```

In HTML:

```html
<p>The Server with ID {{ serverId }} is {{ getServerStatus() }}</p>
```

Here, we have binded string returned types (converted to string if not a string) of `serverId` and `getServerStatus` in TS to HTML

### Property Binding

In TS:

```typescript
export class ServersComponent{
  allowNewServer = false;
  
  constructor(){
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }
}
```

In HTML:

```html
<button class="btn btn-primary" [disabled]="!allowNewServer">Add server</button>

```

Here, we have binded value of `allowNewServer` property in TS to HTML attribute `disabled`.

If we want to display some value, use String Interpolation.
If we want to change some property, use Property Binding.
Don't mix String Interpolation and Property Binding together.

### Event Binding

In TS:

```typscript
export class ServersComponent{
  serverCreationStatus = 'No server was created.';

  onCreateServer(){
    this.serverCreationStatus = 'Server was created';
  }
  onUpdateServerName(event:Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
```

Here, `<HTMLInputElement>` is used for typecasting.

In HTML:

```html
<input type="text"
class="form-control"
(input)="onUpdateServerName($event)">

<p>{{ serverName }}</p>

<button class="btn btn-primary"
(click)="onCreateServer()">Add server</button>

<p>{{ serverCreationStatus }}</p>
```

Here, we have binded `onCreateServer` function to click event and passed value entered in input field to `onUpdateServerName` and display `serverName` on page. `$event` passes event related data to function (including value entered in input).

### Two-Way Binding

In HTML:

```html
<input type="text"
class="form-control"
[(ngModel)]="serverName">
<p>{{ serverName }}</p>
```

In TS:

```typescript
  serverName = 'Test Server';
```

Here, we have performed two-way binding on the `serverName` variable. Change in input field will change variable value and change in variable value will change value on input field.

## Component Communication

### Parent-Child communication

#### Parent to Child communication

In parent HTML:

```html
<div [element]="serverElement"></div>
```

In child ts:

```typescript
@Input() element: {
  type: string,
  name: string
}
```

OR

Using alias

In parent HTML:

```html
<div [srvElement]="serverElement"></div>
}
```

In child ts:

```typescript
@Input('srvElement') element: {
  type: string,
  name: string
}
```

#### Child to Parent communication

In Child ts:

```typescript
@Output()
serverCreated = new EventEmitter<{type: string, name: string}>();

onAddServer() {
  this.serverCreated.emit({
    type: this.serverType,
    name: this.serverName
  });
}

```

In Parent HTML:

```html
<app-server (serverCreated)="serverAdded($event)">
```

OR

Using alias

In Child ts:

```typescript
@Output('srvCreated')
serverCreated = new EventEmitter<{type: string, name: string}>();

onAddServer() {
  this.serverCreated.emit({
    type: this.serverType,
    name: this.serverName
  });
}

```

In Parent HTML:

```html
<app-server (srvCreated)="serverAdded($event)">
```

## View Encapsulation

Angular applies some attributes to each of its component. It gives same attribute to all elements in one component. Using this it performs **Style encapsulation** between different components.

## Overriding Encapsulation

In component ts:

* Default

```typescript
@Component({
  encapsulation: ViewEncapsulation.Emulated
})
```

* Prevent View Encapsulation, disallows Styling Encapsulation between components.

```typescript
@Component({
  encapsulation: ViewEncapsulation.None
})
```

* Uses shadow DOM technology for Styling Encapsulation. Shadow DOM technology is not supported by all browsers.

```typescript
@Component({
  encapsulation: ViewEncapsulation.Native
})
```

## Local references in templates

### By passing to functions

In component HTML:

```html
<input #serverNameInput>
<button (click)="onAddServer(serverNameInput)
```

In component ts:

```typescript
onAddServer(nameInput: HTMLInputElement) {
  // perform operations on HTML element
}
```

OR

### Using ViewChild

In component HTML:

```html
<input #serverContentInput>
```

In component ts:

```typescript
@ViewChild('serverContentInput') serverContentInput: ElementRef;
```

OR

```typescript
@ViewChild(InputComponent) serverContentInput: ElementRef;
```

## Projecting Content into components with ng-content

In Parent HTML:

```html
<app-server-element>
  <p>This content will be injected into the AppServer component.</p>
</app-server-element>
```

In Child component html where we want to inject it:

```html
<div>
  <ng-content></ng-content>
</div>
```

By default, injected content will not be shown in child component. To inject it we need to use ng-content. ng-content will be replaced by the injected content while rendering in the DOM.

## Lifecycle

1. **ngOnChanges**: called multiple times, once when component is created and everytime when an input bound property (@Input) changes, it receives an argument of type SimpleChanges
2. **ngOnInit**: called once the component is initialized. (runs after the constructor)
3. **ngDoCheck**: called very time change detection runs (multiple times, on every check/events like click even if there are no changes)
4. **ngAfterContentInit**: called after content projected by ng-content has been shown in view
5. **ngAfterContentChecked**: called everytime the projected content has been checked
6. **ngAfterViewInit**: called after the component's view and child views have been rendered
7. **ngAfterViewChecked**: called everytime the view and child views have been checked
8. **ngOnDestroy**: called once the component is about to be destroyed

## Getting Access to ng-content with ContentChild

In parent HTML:

```html
<app-server>
  <p #content>
    This content will be projected into the child component using ng-content
  </p>
</app-server>
```

In child ts:
```typescript
@ContentChild('content') paragraph: ElementRef;
```