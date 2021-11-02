# cleanarch
### A simple CLI tô generate typescript code based on uncle-bob clean architecture propose

## Installation
```shell
npm i --save-dev cleanarch
```
## Configure
You need creating in a root folder an a cleanarch-cli.config.json, thats a simple json with keys:

- commands: an array of Command object
- schema: an array of Schema object

**Command Object:**
Owns 2 keys: 
    
- command: An Command following the syntax described at: https://www.npmjs.com/package/commander
- comment: Textual Description Of command

**Schema Object**
- sufix: Suffix for generated class. eg: "Usecase"
- extensionSufix: Suffix for extension: eg: ".usecase"
- languageSufix: We currently only supports typescript so: ".ts" 
- defaultImplements: If the class implements an other classes use an array to declare the sufix of them: ["Inteface", "OtherSuffix"]
- defaultDependencies: If the class uses other classes use an array to declare the sufix of them: ["Protocol"]
- useDecorators: If your class use decorators use an array: ["@Service()", "Other()"]
- folder: Generate file into the folder. eg: "./src/core/usecases/"
- abstract: If class is abstract class so true else false;

**Full Simple**
```json
{
  "lintPreferences": {
    "useSemicolon": true
  },
  "commands": [
    {
      "command": "-it --interface [commands...]",
      "comment": "Generate an Interface"
    },
    {
      "command": "-uc --usecase [commands...]",
      "comment": "Generate an Usecase"
    },
    {
      "command": "-pc --protocol [commands...]",
      "comment": "Generate an Protocol"
    },
    {
      "command": "-ct --connector [commands...]",
      "comment": "Generate an Connector"
    }
  ],
  "schema": [
    {
      "sufix": "Strategy",
      "extensionSufix": ".strategy",
      "languageSufix": ".ts",
      "defaultImplementsSuffix": "",
      "defaultDependenciesSuffix": "",
      "useDecorators": [],
      "folder": "./core/strategies/",
      "abstract": true,
      "importsFrom": []
    },
    {
      "sufix": "Usecase",
      "extensionSufix": ".usecase",
      "languageSufix": ".ts",
      "defaultImplementsSuffix": "Strategy",
      "defaultDependenciesSuffix": "Protocol",
      "useDecorators": [
        "@Core.Injection()"
      ],
      "folder": "./core/usecases/",
      "abstract": false,
      "importsFrom": [
        {
          "path": "'../interfaces/interfaces.exports'",
          "defaultSuffix": "Interface"
        },
        {
          "path": "'../protocols/protocols.exports'",
          "defaultSuffix": "Protocol"
        }
      ]
    },
    {
      "sufix": "Protocol",
      "extensionSufix": ".protocol",
      "languageSufix": ".ts",
      "defaultImplementsSuffix": "",
      "defaultDependenciesSuffix": "",
      "useDecorators": [],
      "folder": "./core/protocols/",
      "abstract": true,
      "importsFrom": []
    },
    {
      "sufix": "Connector",
      "extensionSufix": ".connector",
      "languageSufix": ".ts",
      "defaultImplementsSuffix": "Protocol",
      "defaultDependenciesSuffix": "",
      "useDecorators": [
        "@Core.Injection()"
      ],
      "folder": "./adapters/connectors/",
      "abstract": false,
      "importsFrom": [
        {
          "path": "'../../core/protocols/protocols.exports'",
          "defaultSuffix": "Protocol"
        }
      ]
    }
  ],
  "exportsConfig": {
    "extensionType": ".ts"
  }
}
```

## Default Commands:
### -all
Generete a full and complete schema
> usage: -all <classes...>
### -u
Make the class use a set of classes begining with given classes names
> usage: -u <classes...>
### -us
Make the class use a set of classes with specified names
### -i 
Make the class implements a specific set of classes
> usage: -i <classes...>
### -exports
> usage: -export [path]
Make or update a export file from current path or a path based on relative path (starting in current path)


## Usage
### Generate a complete Schema :

```shell
cleanarch -all UserLogin UserLogout
```
**Thats create a bellow structure:**

    src>
        core>
            strategy>
                user-login.strategy.ts
                user-logout.strategy.ts
            usecases>
                user-login.usecase.ts
                user-logout.usecese.ts
            protocols>
                user-login.protocol.ts
                user-logout.protocol.ts
        adapter>
            connectors>
                user-login.protocol.ts
                user-logout.protocol.ts

### Generate an specify component
*assuming it has been configured in cleanarch-cli.json as presented*

**Generate Usecase** 
```shell
cleanarch -uc Login
```
that's generete a content file be like

```ts
export class LoginUsecase implements LoginStrategy {
  constructor(private readonly loginProtocol: LoginProtocol) {}
}
``` 
**Generate an Usecase with specific dependencies and implements**
```shell
cleanarch -uc Login -i AuthStrategy JwtStrategy AnyAbstractClass -u AuthProtocol AnyClass 
```
generate:
```ts
export class LoginUsecase implements AuthStrategy, JwtStrategy, AnyAbstractClass {
  constructor(private readonly authProtocol: AuthProtocol, private readonly anyClass: AnyClass) { }
} 
```

### If you run this cli in empty project 
#### Run in your terminal:
```shell
npm init -y
```
```
npm i --save-dev @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier prettier ts-loader ts-node tsconfig-paths typescript
```  
#### Add files on source folder
> ts.config.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "dist",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "target": "ES2020",
    "sourceMap": true,
    "incremental": true,
    "skipLibCheck": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noFallthroughCasesInSwitch": true,
    "strict": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "alwaysStrict": true
  }
}
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "dist",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "target": "ES2020",
    "sourceMap": true,
    "incremental": true,
    "skipLibCheck": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noFallthroughCasesInSwitch": true,
    "strict": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "alwaysStrict": true
  }
}
// TODO: a partir de strict: true é configuração manual baseada nos padrões do angular
```
> ts.config.build.json
```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}
```
