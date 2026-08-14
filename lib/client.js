var module = { exports: {} }; var exports = module.exports;
window.__ModuleLoader__.load({ id: "dsh-filelens", factory: (require) => {
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.js
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"), 1);

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// src/client/index.js
var inject = ["remote"];
var Z_ANY = external_exports.any();
var METHOD_NAMES = ["root", "list", "search", "grep", "read", "readMore", "readHex", "write", "readImage"];
var DESCRIPTORS = METHOD_NAMES.map((method) => ({
  id: "dsh-filelens#filelens/" + method,
  service: "filelens",
  namespace: "filelens",
  method,
  invocation: { kind: "direct" },
  parameters: [{ name: "args", wire: "args", source: "json", codec: { mode: "strict", typeSymbol: "any", schema: Z_ANY } }],
  result: { mode: "strict", typeSymbol: "any", schema: Z_ANY }
}));
var remoteApi = null;
async function mountRemote(ctx) {
  const remote = ctx.get("remote");
  if (remote === void 0) return;
  await remote.$mount({ package: "dsh-filelens", descriptors: DESCRIPTORS });
  remoteApi = remote;
}
async function callRemote(method, args) {
  const api = remoteApi;
  if (!api) throw new Error("filelens remote not mounted");
  const name = method.slice(5);
  const res = await api.filelens[name](args);
  if (!res || res.ok !== true) {
    const err = new Error(res && res.error && res.error.message || "remote " + method + " failed");
    err.kind = res && res.error && res.error.code;
    throw err;
  }
  return res.value;
}
async function apply(ctx) {
  const slots = ctx.get("slots");
  const layout = ctx.get("layout");
  const workspaces = ctx.get("workspaces");
  const timer = ctx.get("timer");
  if (slots === void 0) return;
  await mountRemote(ctx);
  const stylesService = ctx.get("styles");
  const styles = stylesService || {
    insert(css) {
      if (typeof document === "undefined" || !document.head) return void 0;
      let tag = document.getElementById("dsh-filelens-styles");
      if (!tag) {
        tag = document.createElement("style");
        tag.id = "dsh-filelens-styles";
        document.head.appendChild(tag);
      }
      tag.textContent = css;
      return void 0;
    }
  };
  const store = { open: false, listeners: /* @__PURE__ */ new Set(), pendingFile: null, fileListeners: /* @__PURE__ */ new Set(), keyListeners: /* @__PURE__ */ new Set() };
  const setOpen = (v) => {
    store.open = v;
    store.listeners.forEach((fn) => fn());
  };
  const basenameOf = (p) => {
    const s = String(p);
    const i = Math.max(s.lastIndexOf("/"), s.lastIndexOf("\\"));
    return i === -1 ? s : s.slice(i + 1);
  };
  const parentOf = (p) => {
    const s = String(p);
    const i = Math.max(s.lastIndexOf("/"), s.lastIndexOf("\\"));
    return i > 0 ? s.slice(0, i) : s;
  };
  const LINE_H = 19;
  const VIRTUAL_THRESHOLD = 800;
  const TREE_SLICE = 300;
  const TABLE_SLICE = 1e3;
  const PREVIEW_KB = 256;
  const escAttr = (s) => typeof CSS !== "undefined" && CSS.escape ? CSS.escape(s) : String(s).replace(/["\\]/g, "\\$&");
  const looksLikePath = (s) => /^[A-Za-z]:[\\/]/.test(s) || /^\\\\/.test(s) || /^\/[^/]/.test(s);
  const requestOpenFile = (path) => {
    store.pendingFile = path;
    setOpen(true);
    if (layout) layout.openDetails();
    store.fileListeners.forEach((fn) => fn(path));
  };
  ctx.effect(() => {
    if (typeof document === "undefined" || !document.addEventListener) return;
    const onDocClick = (event) => {
      const target = event && event.target;
      const btn = target && typeof target.closest === "function" ? target.closest("code button[title]") : null;
      if (!btn) return;
      const title = btn.getAttribute && btn.getAttribute("title");
      if (typeof title !== "string" || !looksLikePath(title)) return;
      event.preventDefault();
      event.stopPropagation();
      requestOpenFile(title);
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  });
  ctx.effect(() => {
    if (typeof document === "undefined" || !document.addEventListener) return;
    const onKey = (e) => {
      if (!store.open) return;
      const t = e.target;
      const inPanel = t && typeof t.closest === "function" && t.closest(".fex-panel");
      if (!inPanel) return;
      const k = e.key;
      const ctrl = e.ctrlKey || e.metaKey;
      const relevant = k === "Escape" || k.startsWith("Arrow") || ctrl && ["f", "t", "p"].includes(k.toLowerCase());
      if (!relevant) return;
      let handled = false;
      store.keyListeners.forEach((fn) => {
        try {
          if (fn(e)) handled = true;
        } catch (err) {
        }
      });
      if (handled) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  });
  const parseMarkdown = (src) => {
    const lines = String(src).split(/\r?\n/);
    const blocks = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const fence = /^(`{3,}|~{3,})/.exec(line);
      if (fence) {
        const lang = line.slice(fence[0].length).trim();
        const buf2 = [];
        i++;
        while (i < lines.length && !/^(`{3,}|~{3,})/.test(lines[i])) {
          buf2.push(lines[i]);
          i++;
        }
        i++;
        blocks.push({ type: "code", lang, text: buf2.join("\n") });
        continue;
      }
      if (/^\s*$/.test(line)) {
        i++;
        continue;
      }
      const h = /^(#{1,6})\s+(.*)$/.exec(line);
      if (h) {
        blocks.push({ type: "heading", level: h[1].length, text: h[2] });
        i++;
        continue;
      }
      if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
        blocks.push({ type: "hr" });
        i++;
        continue;
      }
      if (/^\s*>\s?/.test(line)) {
        const buf2 = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
          buf2.push(lines[i].replace(/^\s*>\s?/, ""));
          i++;
        }
        blocks.push({ type: "quote", text: buf2.join("\n") });
        continue;
      }
      if (/^\s*[-*+]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
          let it = lines[i].replace(/^\s*[-*+]\s+/, "");
          const tm = /^\[([ xX])\]\s+/.exec(it);
          items.push(tm ? { checked: tm[1].toLowerCase() === "x", text: it.slice(tm[0].length) } : { checked: null, text: it });
          i++;
        }
        blocks.push({ type: "ul", items });
        continue;
      }
      if (/^\s*\d+[.)]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
          let it = lines[i].replace(/^\s*\d+[.)]\s+/, "");
          const tm = /^\[([ xX])\]\s+/.exec(it);
          items.push(tm ? { checked: tm[1].toLowerCase() === "x", text: it.slice(tm[0].length) } : { checked: null, text: it });
          i++;
        }
        blocks.push({ type: "ol", items });
        continue;
      }
      if (line.includes("|") && i + 1 < lines.length) {
        const sep = lines[i + 1];
        if (sep.includes("-") && /^\s*\|?[\s:|-]+\|?\s*$/.test(sep)) {
          const split = (s) => s.split("|").map((x) => x.trim()).filter((x, idx, arr) => !(idx === 0 && x === "") && !(idx === arr.length - 1 && x === ""));
          const header = split(line);
          const align = split(sep).map((c) => c.startsWith(":") && c.endsWith(":") ? "center" : c.endsWith(":") ? "right" : c.startsWith(":") ? "left" : null);
          const body = [];
          i += 2;
          while (i < lines.length && lines[i].includes("|") && !/^\s*$/.test(lines[i])) {
            body.push(split(lines[i]));
            i++;
          }
          blocks.push({ type: "table", header, body, align });
          continue;
        }
      }
      const buf = [line];
      i++;
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6})\s/.test(lines[i]) && !/^(`{3,}|~{3,})/.test(lines[i]) && !/^\s*>\s?/.test(lines[i]) && !/^\s*[-*+]\s+/.test(lines[i]) && !/^\s*\d+[.)]\s+/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      blocks.push({ type: "para", text: buf.join("\n") });
    }
    return blocks;
  };
  const SAFE_HREF = /^(https?:|mailto:|#|\/|\.{0,2}\/)/i;
  const SAFE_SRC = /^(https?:|data:image\/|\/|\.{0,2}\/)/i;
  const inline = (text) => {
    const RE = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(\*[^*\n]+\*)|(~~[^~\n]+~~)|(!\[([^\]]*)\]\(([^)\s]+\)))|(\[([^\]]+)\]\(([^)\s]+\)))/g;
    const out = [];
    let last = 0;
    let m;
    while (m = RE.exec(text)) {
      if (m.index > last) out.push(text.slice(last, m.index));
      if (m[1]) out.push(import_react.default.createElement("code", { key: out.length, className: "fex-md-ic" }, m[1].slice(1, -1)));
      else if (m[2]) out.push(import_react.default.createElement("strong", { key: out.length }, inline(m[2].slice(2, -2))));
      else if (m[3]) out.push(import_react.default.createElement("em", { key: out.length }, inline(m[3].slice(1, -1))));
      else if (m[4]) out.push(import_react.default.createElement("del", { key: out.length }, inline(m[4].slice(2, -2))));
      else if (m[5]) out.push(import_react.default.createElement("img", { key: out.length, src: SAFE_SRC.test(m[7]) ? m[7] : void 0, alt: m[6] || "", style: { maxWidth: "100%" } }));
      else if (m[8]) out.push(import_react.default.createElement("a", { key: out.length, href: SAFE_HREF.test(m[10]) ? m[10] : void 0, target: "_blank", rel: "noreferrer" }, inline(m[9])));
      last = RE.lastIndex;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  };
  const FENCE_ALIAS = {
    js: "js",
    javascript: "js",
    jsx: "js",
    mjs: "js",
    cjs: "js",
    node: "js",
    ts: "ts",
    typescript: "ts",
    tsx: "ts",
    py: "py",
    python: "py",
    sh: "sh",
    bash: "sh",
    shell: "sh",
    zsh: "sh",
    ps1: "ps1",
    powershell: "ps1",
    bat: "bat",
    batch: "bat",
    rs: "rs",
    rust: "rs",
    go: "go",
    golang: "go",
    java: "java",
    kt: "kt",
    kotlin: "kt",
    swift: "swift",
    c: "c",
    cpp: "cpp",
    cxx: "cpp",
    h: "c",
    hpp: "cpp",
    cs: "cs",
    csharp: "cs",
    php: "php",
    rb: "rb",
    ruby: "rb",
    lua: "lua",
    dart: "dart",
    sql: "sql",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    toml: "toml",
    ini: "ini",
    cfg: "ini",
    conf: "conf",
    xml: "xml",
    html: "xml",
    svg: "xml",
    vue: "vue",
    svelte: "svelte",
    css: "css",
    scss: "css",
    less: "css",
    text: "text",
    plain: "text",
    plaintext: "text",
    txt: "text",
    md: "text",
    markdown: "text"
  };
  const CodeCopy = (props) => {
    const [done, setDone] = import_react.default.useState(false);
    const onCopy = () => {
      try {
        const p = navigator && navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(props.text) : Promise.reject(new Error("no clipboard"));
        p.then(() => {
          setDone(true);
          if (timer) timer.timeout(() => setDone(false), 1200);
        }).catch(() => {
        });
      } catch (err) {
      }
    };
    return import_react.default.createElement("button", {
      className: "fex-md-copy" + (done ? " done" : ""),
      type: "button",
      onClick: onCopy,
      title: "\u590D\u5236\u4EE3\u7801"
    }, done ? "\u2713" : "\u590D\u5236");
  };
  const MdToc = (props) => {
    const [open, setOpen2] = import_react.default.useState(false);
    const scrollTo = (anchor) => {
      const el = document.querySelector('[data-fex-anchor="' + anchor + '"]');
      if (el && el.scrollIntoView) el.scrollIntoView({ block: "start" });
    };
    return import_react.default.createElement(
      "div",
      { className: "fex-md-toc" },
      import_react.default.createElement(
        "button",
        { className: "fex-md-toc-toggle", type: "button", onClick: () => setOpen2(!open) },
        "\u{1F4D1} \u76EE\u5F55 (" + props.headings.length + ")" + (open ? " \u25BE" : " \u25B8")
      ),
      open ? import_react.default.createElement(
        "ul",
        { className: "fex-md-toc-list" },
        props.headings.map((h) => import_react.default.createElement(
          "li",
          { key: h.key, style: { paddingLeft: (h.level - 1) * 12 } },
          import_react.default.createElement("a", { href: "#", onClick: (e) => {
            e.preventDefault();
            scrollTo(h.anchor);
          } }, inline(h.text))
        ))
      ) : null
    );
  };
  const renderBlock = (b, k) => {
    switch (b.type) {
      case "code": {
        const lang = String(b.lang || "").trim().toLowerCase();
        const lk = FENCE_ALIAS[lang] || langKeyOf(lang);
        const hl = lk !== "text";
        const head = import_react.default.createElement(
          "div",
          { key: "h", className: "fex-md-codehead" },
          import_react.default.createElement("span", { className: "fex-md-codehead-lang" }, lang || ""),
          import_react.default.createElement(CodeCopy, { text: b.text })
        );
        const pre = import_react.default.createElement(
          "pre",
          { key: "p", className: "fex-md-pre" + (hl ? " fex-hl" : "") },
          import_react.default.createElement("code", { className: "fex-md-code" }, hl ? highlight(b.text, lk) : b.text)
        );
        return import_react.default.createElement("div", { key: k, className: "fex-md-pre-wrap" }, head, pre);
      }
      case "heading":
        return import_react.default.createElement("h" + Math.min(b.level, 6), {
          key: k,
          className: "fex-md-h fex-md-h" + Math.min(b.level, 6),
          "data-fex-anchor": b.anchor
        }, inline(b.text));
      case "hr":
        return import_react.default.createElement("hr", { key: k, className: "fex-md-hr" });
      case "quote":
        return import_react.default.createElement("blockquote", { key: k, className: "fex-md-quote" }, renderBlocks(b.text));
      case "ul":
        return import_react.default.createElement(
          "ul",
          { key: k, className: "fex-md-list" },
          b.items.map((it, j) => import_react.default.createElement(
            "li",
            { key: j },
            it.checked !== null ? import_react.default.createElement(
              import_react.default.Fragment,
              null,
              import_react.default.createElement("span", { className: "fex-md-check" + (it.checked ? " on" : "") }, it.checked ? "\u2611" : "\u2610"),
              inline(it.text)
            ) : inline(it.text)
          ))
        );
      case "ol":
        return import_react.default.createElement(
          "ol",
          { key: k, className: "fex-md-list" },
          b.items.map((it, j) => import_react.default.createElement(
            "li",
            { key: j },
            it.checked !== null ? import_react.default.createElement(
              import_react.default.Fragment,
              null,
              import_react.default.createElement("span", { className: "fex-md-check" + (it.checked ? " on" : "") }, it.checked ? "\u2611" : "\u2610"),
              inline(it.text)
            ) : inline(it.text)
          ))
        );
      case "table":
        return import_react.default.createElement(
          "table",
          { key: k, className: "fex-md-table" },
          import_react.default.createElement("thead", null, import_react.default.createElement("tr", null, b.header.map((c, j) => import_react.default.createElement("th", { key: j, style: b.align && b.align[j] ? { textAlign: b.align[j] } : void 0 }, inline(c))))),
          import_react.default.createElement("tbody", null, b.body.map((r, j) => import_react.default.createElement("tr", { key: j }, b.header.map((c, idx) => import_react.default.createElement("td", { key: idx, style: b.align && b.align[idx] ? { textAlign: b.align[idx] } : void 0 }, inline(r[idx] || ""))))))
        );
      case "para":
      default:
        return import_react.default.createElement("p", { key: k, className: "fex-md-p" }, inline(b.text));
    }
  };
  const renderBlocks = (text) => parseMarkdown(text).map((b, k) => renderBlock(b, k));
  const renderMarkdown = (text) => {
    const blocks = parseMarkdown(text);
    const headings = [];
    blocks.forEach((b, k) => {
      if (b.type === "heading") {
        b.anchor = headings.length;
        headings.push({ level: b.level, text: b.text, anchor: b.anchor, key: k });
      }
    });
    const toc = headings.length >= 2 ? import_react.default.createElement(MdToc, { headings }) : null;
    const body = blocks.map((b, k) => renderBlock(b, k));
    return import_react.default.createElement(import_react.default.Fragment, null, toc, body);
  };
  const def = (o) => Object.assign({
    str: true,
    line: [],
    block: null,
    kw: [],
    types: false,
    fnCall: false,
    backtick: false,
    hex: false,
    xml: false,
    ident: /[A-Za-z_$]/
  }, o);
  const LANGS = {
    text: def({ str: false, kw: null }),
    json: def({ kw: ["true", "false", "null"] }),
    js: def({ backtick: true, line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "new", "class", "extends", "import", "export", "from", "default", "async", "await", "try", "catch", "finally", "throw", "typeof", "instanceof", "this", "super", "null", "undefined", "true", "false", "in", "of", "delete", "void", "yield", "static", "get", "set"] }),
    ts: def({ backtick: true, line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "new", "class", "extends", "implements", "import", "export", "from", "default", "async", "await", "try", "catch", "finally", "throw", "typeof", "instanceof", "this", "super", "null", "undefined", "true", "false", "in", "of", "delete", "void", "yield", "static", "interface", "type", "enum", "namespace", "declare", "readonly", "public", "private", "protected", "abstract", "as", "keyof", "infer", "satisfies"] }),
    py: def({ line: ["#"], types: true, fnCall: true, kw: ["def", "return", "if", "elif", "else", "for", "while", "in", "not", "and", "or", "import", "from", "as", "class", "try", "except", "finally", "raise", "with", "lambda", "None", "True", "False", "pass", "break", "continue", "yield", "global", "nonlocal", "del", "is", "assert", "async", "await", "match", "case"] }),
    go: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["package", "import", "func", "var", "const", "type", "struct", "interface", "return", "if", "else", "for", "range", "switch", "case", "break", "continue", "default", "defer", "go", "chan", "map", "select", "fallthrough", "true", "false", "nil"] }),
    rs: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["fn", "let", "mut", "const", "struct", "enum", "impl", "trait", "use", "mod", "pub", "return", "if", "else", "for", "while", "loop", "match", "break", "continue", "async", "await", "move", "ref", "in", "true", "false", "self", "Self"] }),
    java: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["public", "private", "protected", "class", "interface", "extends", "implements", "return", "if", "else", "for", "while", "switch", "case", "break", "continue", "new", "static", "final", "void", "int", "long", "double", "boolean", "char", "byte", "short", "float", "try", "catch", "finally", "throw", "throws", "package", "import", "this", "super", "null", "true", "false", "abstract", "enum"] }),
    c: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["include", "define", "ifdef", "ifndef", "endif", "if", "else", "for", "while", "return", "void", "int", "char", "float", "double", "long", "short", "unsigned", "signed", "struct", "typedef", "enum", "union", "static", "extern", "const", "switch", "case", "break", "continue", "sizeof", "true", "false", "NULL"] }),
    cpp: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["include", "define", "ifdef", "ifndef", "endif", "if", "else", "for", "while", "return", "void", "int", "char", "float", "double", "long", "short", "unsigned", "signed", "struct", "typedef", "enum", "union", "static", "extern", "const", "switch", "case", "break", "continue", "sizeof", "true", "false", "NULL", "class", "public", "private", "protected", "namespace", "using", "template", "typename", "virtual", "override", "new", "delete", "this", "nullptr", "bool", "auto"] }),
    cs: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["public", "private", "protected", "internal", "class", "interface", "namespace", "using", "return", "if", "else", "for", "foreach", "while", "switch", "case", "break", "continue", "new", "static", "void", "int", "long", "double", "bool", "string", "var", "try", "catch", "finally", "throw", "this", "base", "null", "true", "false", "async", "await", "readonly"] }),
    php: def({ line: ["//", "#"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["echo", "print", "if", "else", "elseif", "for", "foreach", "while", "function", "return", "class", "public", "private", "protected", "static", "new", "try", "catch", "finally", "throw", "require", "include", "true", "false", "null", "namespace", "use", "extends", "implements", "interface", "abstract", "final", "switch", "case", "break", "continue", "default", "global", "this"] }),
    rb: def({ line: ["#"], types: true, fnCall: true, kw: ["def", "end", "if", "elsif", "else", "unless", "while", "until", "for", "in", "do", "return", "yield", "module", "class", "require", "puts", "print", "true", "false", "nil", "and", "or", "not", "self", "case", "when", "break", "next", "rescue", "ensure", "begin", "raise"] }),
    sh: def({ line: ["#"], kw: ["if", "then", "else", "elif", "fi", "for", "do", "done", "while", "until", "case", "esac", "function", "echo", "exit", "return", "set", "local", "export", "read", "test", "true", "false"] }),
    ps1: def({ line: ["#"], types: true, fnCall: true, kw: ["if", "else", "elseif", "for", "foreach", "while", "switch", "function", "return", "param", "begin", "process", "end", "try", "catch", "finally", "throw", "new", "true", "false", "null", "filter", "until", "do", "in"] }),
    bat: def({ str: false, kw: ["echo", "set", "if", "else", "for", "do", "goto", "call", "exit", "rem", "cd", "dir", "copy", "move", "del", "errorlevel", "not", "exist"] }),
    lua: def({ line: ["--"], types: false, fnCall: true, kw: ["function", "end", "if", "then", "else", "elseif", "for", "while", "do", "repeat", "until", "return", "local", "nil", "true", "false", "and", "or", "not", "break", "in"] }),
    kt: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["fun", "val", "var", "class", "object", "interface", "return", "if", "else", "when", "for", "while", "break", "continue", "import", "package", "public", "private", "protected", "internal", "open", "override", "abstract", "sealed", "data", "null", "true", "false", "this", "try", "catch", "finally", "throw", "is", "in", "as", "companion", "lateinit", "init"] }),
    swift: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["func", "let", "var", "class", "struct", "enum", "protocol", "extension", "import", "return", "if", "else", "guard", "for", "while", "repeat", "switch", "case", "break", "continue", "public", "private", "internal", "open", "override", "static", "self", "nil", "true", "false", "try", "catch", "throw", "throws", "defer", "in", "as", "is", "where"] }),
    dart: def({ line: ["//"], block: ["/*", "*/"], types: true, fnCall: true, kw: ["class", "extends", "implements", "mixin", "void", "int", "double", "bool", "String", "var", "final", "const", "return", "if", "else", "for", "while", "switch", "case", "break", "continue", "import", "export", "library", "part", "of", "new", "this", "super", "null", "true", "false", "try", "catch", "finally", "throw", "async", "await", "enum", "typedef", "abstract"] }),
    sql: def({ line: ["--"], types: true, kw: ["select", "from", "where", "insert", "into", "values", "update", "set", "delete", "create", "table", "index", "view", "join", "left", "right", "inner", "outer", "on", "group", "by", "order", "having", "limit", "offset", "as", "and", "or", "not", "null", "primary", "key", "foreign", "references", "distinct", "count", "sum", "avg", "min", "max", "asc", "desc", "drop", "alter", "add", "column"] }),
    yaml: def({ line: ["#"] }),
    toml: def({ line: ["#"] }),
    ini: def({ line: [";", "#"] }),
    conf: def({ line: ["#"] }),
    vue: def({ block: ["<!--", "-->"], xml: true }),
    svelte: def({ block: ["<!--", "-->"], xml: true }),
    xml: def({ block: ["<!--", "-->"], xml: true }),
    css: def({ block: ["/*", "*/"], hex: true, ident: /[A-Za-z_-]/ })
  };
  const EXT_TO_LANG = {
    js: "js",
    mjs: "js",
    cjs: "js",
    jsx: "js",
    ts: "ts",
    tsx: "ts",
    py: "py",
    go: "go",
    rs: "rs",
    java: "java",
    c: "c",
    h: "c",
    cpp: "cpp",
    hpp: "cpp",
    cc: "cpp",
    cs: "cs",
    php: "php",
    rb: "rb",
    sh: "sh",
    bash: "sh",
    zsh: "sh",
    ps1: "ps1",
    bat: "bat",
    kt: "kt",
    swift: "swift",
    lua: "lua",
    dart: "dart",
    sql: "sql",
    yaml: "yaml",
    yml: "yaml",
    toml: "toml",
    ini: "ini",
    cfg: "ini",
    conf: "conf",
    xml: "xml",
    html: "xml",
    svg: "xml",
    vue: "vue",
    svelte: "svelte",
    css: "css",
    scss: "css",
    less: "css"
  };
  const langKeyOf = (ext) => EXT_TO_LANG[ext] || "text";
  const highlight = (text, lang) => {
    const d = LANGS[lang] || LANGS.text;
    const out = [];
    let buf = "";
    const flush = () => {
      if (buf) {
        out.push(buf);
        buf = "";
      }
    };
    const emit = (cls, s) => {
      flush();
      out.push(import_react.default.createElement("span", { key: out.length, className: "fex-hl-" + cls }, s));
    };
    let i = 0;
    while (i < text.length) {
      const ch = text[i];
      if (d.str && (ch === '"' || ch === "'" || ch === "`" && d.backtick)) {
        const q = ch;
        let j = i + 1;
        let s = q;
        while (j < text.length) {
          const c = text[j];
          if (c === "\\") {
            s += c;
            if (j + 1 < text.length) {
              s += text[j + 1];
              j += 2;
            } else {
              j++;
            }
            continue;
          }
          s += c;
          j++;
          if (c === q) break;
          if (c === "\n" && q !== "`") break;
        }
        emit("str", s);
        i = j;
        continue;
      }
      if (d.line) {
        const hit = d.line.find((c) => text.startsWith(c, i));
        if (hit) {
          const nl = text.indexOf("\n", i);
          const end = nl === -1 ? text.length : nl;
          emit("com", text.slice(i, end));
          i = end;
          continue;
        }
      }
      if (d.block) {
        const open = d.block[0];
        const close = d.block[1];
        if (text.startsWith(open, i)) {
          const ci = text.indexOf(close, i + open.length);
          const end = ci === -1 ? text.length : ci + close.length;
          emit("com", text.slice(i, end));
          i = end;
          continue;
        }
      }
      if (d.xml && ch === "<") {
        const m = /^<\/?[A-Za-z][A-Za-z0-9-]*/.exec(text.slice(i));
        if (m) {
          emit("tag", m[0]);
          i += m[0].length;
          continue;
        }
      }
      if (d.xml && ch === ">") {
        emit("tag", ">");
        i++;
        continue;
      }
      if (d.xml && /[A-Za-z-]/.test(ch)) {
        const m = /^[A-Za-z-]+(?=\s*=)/.exec(text.slice(i));
        if (m) {
          emit("attr", m[0]);
          i += m[0].length;
          continue;
        }
      }
      if (d.hex && ch === "#") {
        const m = /^#[0-9a-fA-F]{3,8}\b/.exec(text.slice(i));
        if (m) {
          emit("num", m[0]);
          i += m[0].length;
          continue;
        }
      }
      if (/[0-9]/.test(ch)) {
        const m = /^[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/.exec(text.slice(i));
        emit("num", m[0]);
        i += m[0].length;
        continue;
      }
      if (d.ident.test(ch)) {
        const m = /^[A-Za-z_$][A-Za-z0-9_$]*/.exec(text.slice(i));
        const word = m[0];
        if (d.kw && d.kwSet && d.kwSet.has(word)) emit("kw", word);
        else if (d.types && /^[A-Z]/.test(word)) emit("type", word);
        else if (d.fnCall && /^\s*\(/.test(text.slice(i + word.length))) emit("fn", word);
        else buf += word;
        i += word.length;
        continue;
      }
      buf += ch;
      i++;
    }
    flush();
    return out;
  };
  const highlightLine = (line, lang, state) => {
    const d = LANGS[lang] || LANGS.text;
    const out = [];
    let buf = "";
    const flush = () => {
      if (buf) {
        out.push(buf);
        buf = "";
      }
    };
    const emit = (cls, s) => {
      flush();
      out.push(import_react.default.createElement("span", { key: out.length, className: "fex-hl-" + cls }, s));
    };
    let i = 0;
    if (d.block && state && state.inComment) {
      const close = d.block[1];
      const ci = line.indexOf(close);
      if (ci === -1) {
        emit("com", line);
        return out;
      }
      emit("com", line.slice(0, ci + close.length));
      state.inComment = false;
      i = ci + close.length;
    }
    while (i < line.length) {
      const ch = line[i];
      if (d.str && (ch === '"' || ch === "'" || ch === "`" && d.backtick)) {
        const q = ch;
        let j = i + 1;
        let s = q;
        while (j < line.length) {
          const c = line[j];
          if (c === "\\") {
            s += c;
            if (j + 1 < line.length) {
              s += line[j + 1];
              j += 2;
            } else {
              j++;
            }
            continue;
          }
          s += c;
          j++;
          if (c === q) break;
          if (c === "\n" && q !== "`") break;
        }
        emit("str", s);
        i = j;
        continue;
      }
      if (d.line) {
        const hit = d.line.find((c) => line.startsWith(c, i));
        if (hit) {
          emit("com", line.slice(i));
          return out;
        }
      }
      if (d.block) {
        const open = d.block[0];
        const close = d.block[1];
        if (line.startsWith(open, i)) {
          const ci = line.indexOf(close, i + open.length);
          if (ci === -1) {
            emit("com", line.slice(i));
            if (state) state.inComment = true;
            return out;
          }
          emit("com", line.slice(i, ci + close.length));
          i = ci + close.length;
          continue;
        }
      }
      if (d.xml && ch === "<") {
        const m = /^<\/?[A-Za-z][A-Za-z0-9-]*/.exec(line.slice(i));
        if (m) {
          emit("tag", m[0]);
          i += m[0].length;
          continue;
        }
      }
      if (d.xml && ch === ">") {
        emit("tag", ">");
        i++;
        continue;
      }
      if (d.xml && /[A-Za-z-]/.test(ch)) {
        const m = /^[A-Za-z-]+(?=\s*=)/.exec(line.slice(i));
        if (m) {
          emit("attr", m[0]);
          i += m[0].length;
          continue;
        }
      }
      if (d.hex && ch === "#") {
        const m = /^#[0-9a-fA-F]{3,8}\b/.exec(line.slice(i));
        if (m) {
          emit("num", m[0]);
          i += m[0].length;
          continue;
        }
      }
      if (/[0-9]/.test(ch)) {
        const m = /^[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/.exec(line.slice(i));
        emit("num", m[0]);
        i += m[0].length;
        continue;
      }
      if (d.ident.test(ch)) {
        const m = /^[A-Za-z_$][A-Za-z0-9_$]*/.exec(line.slice(i));
        const word = m[0];
        if (d.kw && d.kwSet && d.kwSet.has(word)) emit("kw", word);
        else if (d.types && /^[A-Z]/.test(word)) emit("type", word);
        else if (d.fnCall && /^\s*\(/.test(line.slice(i + word.length))) emit("fn", word);
        else buf += word;
        i += word.length;
        continue;
      }
      buf += ch;
      i++;
    }
    flush();
    return out;
  };
  const computeCommentState = (lines, lang) => {
    const d = LANGS[lang];
    const states = [];
    let inC = false;
    if (d && d.block) {
      const open = d.block[0];
      const close = d.block[1];
      for (const l of lines) {
        states.push(inC);
        if (inC) {
          if (l.indexOf(close) !== -1) inC = false;
        } else if (l.indexOf(open) !== -1) {
          const oi = l.indexOf(open);
          if (l.indexOf(close, oi + open.length) === -1) inC = true;
        }
      }
    } else {
      lines.forEach(() => states.push(false));
    }
    return states;
  };
  Object.keys(LANGS).forEach((k) => {
    if (LANGS[k].kw) LANGS[k].kwSet = new Set(LANGS[k].kw);
  });
  const parseCsv = (text, sep) => {
    const rows = [];
    let row = [];
    let field = "";
    let inQ = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQ) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else inQ = false;
        } else field += ch;
      } else if (ch === '"') inQ = true;
      else if (ch === sep) {
        row.push(field);
        field = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else field += ch;
    }
    if (field !== "" || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows;
  };
  const renderTable = (text, sep) => {
    const all = parseCsv(text, sep);
    const rows = all.slice(0, TABLE_SLICE);
    if (!rows.length) return import_react.default.createElement("div", { className: "fex-note" }, "\u7A7A\u6587\u4EF6");
    const header = rows[0];
    const table = import_react.default.createElement(
      "div",
      { className: "fex-table-wrap" },
      import_react.default.createElement(
        "table",
        { className: "fex-md-table" },
        import_react.default.createElement("thead", null, import_react.default.createElement("tr", null, header.map((c, j) => import_react.default.createElement("th", { key: j }, c)))),
        import_react.default.createElement("tbody", null, rows.slice(1).map((r, k) => import_react.default.createElement("tr", { key: k }, header.map((c, j) => import_react.default.createElement("td", { key: j }, r[j] || "")))))
      )
    );
    if (all.length > rows.length) {
      return import_react.default.createElement(
        import_react.default.Fragment,
        null,
        table,
        import_react.default.createElement("div", { className: "fex-note" }, "\u4EC5\u663E\u793A\u524D " + rows.length + " \u884C\uFF08\u5171 " + all.length + " \u884C\uFF09")
      );
    }
    return table;
  };
  const lineRow = (k, l, wrapCls, lang, mark, commentState) => {
    let content;
    if (mark && k === mark.line && mark.len > 0) {
      const before = l.slice(0, mark.col);
      const mid = l.slice(mark.col, mark.col + mark.len);
      const after = l.slice(mark.col + mark.len);
      content = [before, import_react.default.createElement("mark", { key: "m", className: "fex-mark" }, mid), after];
    } else {
      content = lang && lang !== "text" ? highlightLine(l, lang, { inComment: !!(commentState && commentState[k]) }) : l;
    }
    return import_react.default.createElement(
      "div",
      {
        key: k,
        className: "fex-ln" + (mark && k === mark.line ? " fex-ln-found" : ""),
        "data-ln": k
      },
      import_react.default.createElement("span", { className: "fex-ln-g" }, String(k + 1)),
      import_react.default.createElement("span", { className: "fex-ln-c " + wrapCls }, content)
    );
  };
  const VirtualLines = (props) => {
    const [start, setStart] = import_react.default.useState(0);
    const [count, setCount] = import_react.default.useState(80);
    import_react.default.useEffect(() => {
      const m = props.mark;
      if (!m || !props.lines.length) return;
      if (m.line < start || m.line >= start + count) setStart(Math.max(0, m.line - 30));
    }, [props.mark]);
    const onScroll = (e) => {
      const el = e.currentTarget;
      setStart(Math.max(0, Math.floor(el.scrollTop / LINE_H) - 30));
      setCount(Math.ceil(el.clientHeight / LINE_H) + 60);
    };
    const end = Math.min(props.lines.length, start + count);
    return import_react.default.createElement(
      "div",
      {
        className: "fex-lines",
        "data-fex-path": props.dataPath || "",
        onScroll
      },
      import_react.default.createElement("div", { className: "fex-vspacer", style: { height: start * LINE_H } }),
      props.lines.slice(start, end).map((l, k) => lineRow(start + k, l, props.wrapCls, props.lang, props.mark, props.commentState)),
      import_react.default.createElement("div", { className: "fex-vspacer", style: { height: (props.lines.length - end) * LINE_H } })
    );
  };
  const renderLines = (text, wrapCls, lang, mark, dataPath) => {
    const lines = String(text).split("\n");
    const st = lang && lang !== "text" ? computeCommentState(lines, lang) : null;
    if (lines.length > VIRTUAL_THRESHOLD && wrapCls === "fex-wrap-off") {
      return import_react.default.createElement(VirtualLines, { lines, wrapCls, lang, mark, dataPath, commentState: st });
    }
    return import_react.default.createElement(
      "div",
      { className: "fex-lines", "data-fex-path": dataPath || "" },
      lines.map((l, k) => lineRow(k, l, wrapCls, lang, mark, st))
    );
  };
  const renderDiff = (text, wrapCls, dataPath) => {
    const lines = String(text).split("\n");
    return import_react.default.createElement(
      "div",
      { className: "fex-lines", "data-fex-path": dataPath || "" },
      lines.map((l, k) => {
        let cls = null;
        if (l.startsWith("+") && !l.startsWith("+++")) cls = "fex-diff-add";
        else if (l.startsWith("-") && !l.startsWith("---")) cls = "fex-diff-del";
        else if (l.startsWith("@@") || l.startsWith("diff ") || l.startsWith("index ") || l.startsWith("--- ") || l.startsWith("+++ ")) cls = "fex-diff-meta";
        return import_react.default.createElement(
          "div",
          { key: k, className: "fex-ln", "data-ln": k },
          import_react.default.createElement("span", { className: "fex-ln-g" }, String(k + 1)),
          import_react.default.createElement("span", { className: "fex-ln-c " + wrapCls + (cls ? " " + cls : "") }, l || "\xA0")
        );
      })
    );
  };
  const renderLog = (text, wrapCls, dataPath) => {
    const lines = String(text).split("\n");
    return import_react.default.createElement(
      "div",
      { className: "fex-lines", "data-fex-path": dataPath || "" },
      lines.map((l, k) => {
        let cls = null;
        if (/\b(ERROR|FATAL|CRITICAL|错误|异常)\b/.test(l)) cls = "fex-log-error";
        else if (/\b(WARN|WARNING|警告)\b/.test(l)) cls = "fex-log-warn";
        else if (/\b(INFO|信息)\b/.test(l)) cls = "fex-log-info";
        return import_react.default.createElement(
          "div",
          { key: k, className: "fex-ln", "data-ln": k },
          import_react.default.createElement("span", { className: "fex-ln-g" }, String(k + 1)),
          import_react.default.createElement("span", { className: "fex-ln-c " + wrapCls + (cls ? " " + cls : "") }, l || "\xA0")
        );
      })
    );
  };
  const renderHex = (bytes, dataPath) => {
    const rows = [];
    let r = 0;
    for (let i = 0; i < bytes.length; i += 16) {
      const slice = bytes.slice(i, i + 16);
      const hex = [];
      const ascii = [];
      slice.forEach((b) => {
        hex.push(("0" + b.toString(16)).slice(-2));
        ascii.push(b >= 32 && b < 127 ? String.fromCharCode(b) : ".");
      });
      while (hex.length < 16) hex.push("  ");
      const hexStr = hex.map((h, j) => j === 8 ? " " + h : h).join(" ");
      rows.push(import_react.default.createElement(
        "div",
        { key: i, className: "fex-ln", "data-ln": r },
        import_react.default.createElement("span", { className: "fex-ln-g" }, i.toString(16).padStart(8, "0")),
        import_react.default.createElement(
          "span",
          { className: "fex-ln-c fex-wrap-off" },
          import_react.default.createElement("span", { className: "fex-hex" }, hexStr),
          import_react.default.createElement("span", { className: "fex-hex-ascii" }, ascii.join(""))
        )
      ));
      r++;
    }
    return import_react.default.createElement("div", { className: "fex-lines", "data-fex-path": dataPath || "" }, rows);
  };
  const extOf = (name) => {
    const m = /\.[^.]+$/.exec(name);
    return m ? m[0].slice(1).toLowerCase() : "";
  };
  const detectType = (name) => {
    const ext = extOf(name);
    if (["md", "markdown", "mdx"].includes(ext)) return "markdown";
    if (["png", "jpg", "jpeg", "gif", "webp", "svg", "ico", "bmp"].includes(ext)) return "image";
    if (ext === "json") return "json";
    if (ext === "csv") return "csv";
    if (ext === "tsv") return "tsv";
    if (["diff", "patch"].includes(ext)) return "diff";
    if (ext === "log") return "log";
    if (["txt", "rst", "text"].includes(ext)) return "text";
    if (EXT_TO_LANG[ext]) return "code";
    return "text";
  };
  const renderPretty = (file, content) => {
    const typ = file.type;
    if (typ === "markdown") {
      try {
        return import_react.default.createElement("div", { className: "fex-md" }, renderMarkdown(content.text));
      } catch (err) {
        return import_react.default.createElement(
          import_react.default.Fragment,
          null,
          import_react.default.createElement("div", { className: "fex-note" }, "Markdown \u6E32\u67D3\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u539F\u6587\uFF1A" + (err && err.message || String(err))),
          import_react.default.createElement("pre", { className: "fex-pre" }, content.text)
        );
      }
    }
    if (typ === "csv") return renderTable(content.text, ",");
    if (typ === "tsv") return renderTable(content.text, "	");
    return import_react.default.createElement("pre", { className: "fex-pre" }, content.text);
  };
  const crumbSegments = (p) => {
    const s = String(p);
    const parts = s.split(/[\\/]/).filter((x) => x !== "");
    if (/^[A-Za-z]:/.test(s)) {
      const head = parts[0];
      return parts.slice(1).map((seg, i) => ({
        label: i === 0 ? head + "\\" + seg : seg,
        path: head + "\\" + parts.slice(1, i + 2).join("\\")
      }));
    }
    let acc = "";
    return parts.map((seg) => {
      acc += "/" + seg;
      return { label: seg, path: acc };
    });
  };
  const P = {
    folder: ["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"],
    folderOpen: ["M6 14l1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"],
    file: ["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", "M14 2v4a2 2 0 0 0 2 2h4"],
    caret: ["m9 18 6-6-6-6"],
    back: ["m12 19-7-7 7-7", "M19 12H5"],
    refresh: ["M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", "M21 3v5h-5"],
    folderPlus: ["M12 10v6", "M9 13h6", "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"],
    eye: ["M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
    eyeOff: ["M9.88 9.88a3 3 0 1 0 4.24 4.24", "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68", "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61", "M2 2l20 20"],
    x: ["M18 6 6 18", "m6 6 12 12"],
    search: ["M21 21l-4.35-4.35", "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"],
    copy: ["M8 8h12v12H8z", "M4 16V4h12"],
    folderOpen2: ["M6 14l1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"],
    external: ["M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", "M15 3h6v6", "M10 14 21 3"],
    zoomIn: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "M11 8v6", "M8 11h6", "M21 21l-4.35-4.35"],
    zoomOut: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "M8 11h6", "M21 21l-4.35-4.35"],
    rotate: ["M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", "M21 3v5h-5"],
    download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
    edit: ["M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"],
    save: ["M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", "M17 21v-8H7v8", "M7 3v5h8"]
  };
  const icon = (key, cls) => import_react.default.createElement("svg", {
    viewBox: "0 0 24 24",
    width: 14,
    height: 14,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: cls,
    "aria-hidden": true
  }, P[key].map((d) => import_react.default.createElement("path", { key: d, d })));
  const extColor = (name) => {
    const m = /\.[^.]+$/.exec(name);
    if (!m) return null;
    const e = m[0].slice(1).toLowerCase();
    if (["js", "jsx", "ts", "tsx", "mjs", "cjs", "py", "go", "rs", "java", "c", "h", "cpp", "hpp", "cs", "php", "rb", "sh", "ps1", "bat", "kt", "swift", "lua", "dart", "sql"].includes(e)) return "#5b9dff";
    if (["json", "yaml", "yml", "toml", "xml", "ini", "cfg", "conf"].includes(e)) return "#e8a33d";
    if (["md", "markdown", "mdx", "txt", "rst", "log"].includes(e)) return "#b48ae6";
    if (["html", "css", "scss", "less", "vue", "svelte"].includes(e)) return "#e0709a";
    if (["png", "jpg", "jpeg", "gif", "svg", "webp", "ico", "bmp"].includes(e)) return "#55c285";
    if (["csv", "tsv", "diff", "patch"].includes(e)) return "#55c285";
    return null;
  };
  ctx.effect(() => styles.insert(`
      .fex-panel{position:relative;display:flex;flex-direction:column;height:100%;min-height:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);font-size:13px;line-height:20px;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;user-select:none;}
      .fex-panel *{box-sizing:border-box;}
      .fex-head{display:flex;align-items:center;gap:6px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);}
      .fex-title{display:flex;align-items:center;gap:6px;font-weight:600;font-size:13px;line-height:18px;letter-spacing:.2px;flex:none;color:var(--dsw-alias-label-primary);}
      .fex-title svg{color:var(--dsw-alias-state-warn-primary);}
      .fex-searchmode{flex:none;height:24px;padding:0 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:11px;cursor:pointer;}
      .fex-searchmode.on{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .fex-search{flex:1;min-width:0;height:24px;padding:0 8px 0 26px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-size:12px;outline:none;transition:border-color .12s ease;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>');background-repeat:no-repeat;background-position:8px center;}
      .fex-search:focus{border-color:var(--dsw-alias-brand-primary);}
      .fex-search::placeholder{color:var(--dsw-alias-label-secondary);opacity:.7;font-family:var(--ds-font-family-code);font-size:10.5px;}
      .fex-crumbs{display:flex;align-items:center;gap:2px;padding:4px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex:none;overflow-x:auto;}
      .fex-crumb{flex:none;padding:1px 6px;border-radius:4px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:16px;cursor:pointer;font-family:var(--ds-font-family-code);}
      .fex-crumb:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);}
      .fex-crumb.current{color:var(--dsw-alias-label-primary);font-weight:600;cursor:default;}
      .fex-crumb-sep{color:var(--dsw-alias-label-secondary);opacity:.5;font-size:11px;flex:none;}
      .fex-actions{display:flex;align-items:center;gap:2px;flex:none;margin-left:auto;}
      .fex-ibtn{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background .12s ease,color .12s ease,border-color .12s ease;}
      .fex-ibtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);}
      .fex-ibtn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
      .fex-ibtn.active{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);}
      .fex-tabs{display:flex;align-items:center;gap:4px;padding:6px 10px 0;overflow-x:auto;flex:none;background:var(--dsw-alias-bg-layer-1);}
      .fex-tab{display:flex;align-items:center;gap:4px;max-width:180px;padding:3px 6px 3px 10px;border-radius:7px 7px 0 0;border:1px solid var(--dsw-alias-border-l1);border-bottom:none;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);font-size:11.5px;line-height:16px;cursor:grab;flex:none;user-select:none;animation:fexTabIn .28s ease-out both;}
      .fex-tab.dragging{opacity:.45;}
      .fex-tab.active{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);}
      .fex-tab-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .fex-tab-x{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;border:none;border-radius:4px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;flex:none;}
      .fex-tab-x:hover{background:rgba(224,108,117,.2);color:#e06c75;}
      .fex-findbar{display:flex;align-items:center;gap:6px;padding:5px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex:none;}
      .fex-find-input{flex:1;min-width:0;height:24px;padding:0 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-size:12px;outline:none;}
      .fex-find-input:focus{border-color:var(--dsw-alias-brand-primary);}
      .fex-find-count{flex:none;font-size:11px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;}
      .fex-tree{flex:1;min-height:0;overflow:auto;padding:6px 4px;}
      .fex-row{display:flex;align-items:center;gap:6px;height:28px;padding:0 8px;border-radius:6px;cursor:pointer;white-space:nowrap;color:var(--dsw-alias-label-primary);font-size:12.5px;line-height:18px;transition:background .1s ease;}
      .fex-row:hover{background:var(--dsw-alias-bg-layer-1);}
      .fex-row.selected{background:rgba(91,157,255,.16);}
      .fex-row.cursor{box-shadow:inset 0 0 0 1px var(--dsw-alias-brand-primary);}
      .fex-grep-line{flex:none;font-size:11px;color:var(--dsw-alias-state-warn-primary);font-variant-numeric:tabular-nums;}
      .fex-grep-snippet{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;color:var(--dsw-alias-label-secondary);opacity:.7;font-size:11px;font-family:var(--ds-font-family-code);}
      .fex-caret{width:14px;flex:none;display:inline-flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary);transition:transform .15s ease;}
      .fex-caret.open{transform:rotate(90deg);}
      .fex-ico{flex:none;display:inline-flex;align-items:center;justify-content:center;width:16px;}
      .fex-ico.dir{color:var(--dsw-alias-state-warn-primary);}
      .fex-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;}
      .fex-size{flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;padding-left:6px;}
      .fex-content{flex:1;min-height:0;display:flex;flex-direction:column;}
      .fex-edit{flex:1;min-height:0;margin:0;padding:10px 12px;border:none;outline:none;resize:none;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:var(--ds-font-family-code);font-size:12px;line-height:19px;white-space:pre-wrap;overflow-wrap:break-word;tab-size:4;user-select:text;}
      .fex-preview-name{font-weight:600;font-size:13px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .fex-badge{flex:none;padding:1px 7px;border-radius:999px;font-size:10.5px;line-height:15px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);}
      .fex-badge.warn{color:var(--dsw-alias-state-warn-primary);border-color:var(--dsw-alias-state-warn-primary);background:transparent;}
      .fex-lines{flex:1;overflow:auto;padding:8px 0;font-family:var(--ds-font-family-code);font-size:12px;line-height:19px;user-select:text;-webkit-font-smoothing:antialiased;font-variant-ligatures:none;}
      .fex-vspacer{flex:none;}
      .fex-ln{display:flex;align-items:flex-start;}
      .fex-ln:hover{background:var(--dsw-alias-bg-layer-1);}
      .fex-ln-found{background:rgba(255,196,0,.1);}
      .fex-mark{background:rgba(255,196,0,.35);color:inherit;border-radius:2px;}
      .fex-ln-g{flex:none;min-width:42px;padding:0 8px;text-align:right;border-right:1px solid var(--dsw-alias-border-l1);margin-right:8px;color:var(--dsw-alias-label-secondary);opacity:.55;user-select:none;font-variant-numeric:tabular-nums;}
      .fex-ln-c{flex:1;min-width:0;}
      .fex-hex{margin-right:14px;}
      .fex-hex-ascii{color:var(--dsw-alias-label-secondary);}
      .fex-pre{flex:1;overflow:auto;margin:0;padding:10px 12px;font-family:var(--ds-font-family-code);font-size:12px;line-height:19px;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;tab-size:4;color:var(--dsw-alias-label-primary);user-select:text;-webkit-font-smoothing:antialiased;font-variant-ligatures:none;}
      .fex-hl-kw{color:#c678dd;}
      .fex-hl-str{color:#98c379;}
      .fex-hl-num{color:#d19a66;}
      .fex-hl-com{color:var(--dsw-alias-label-secondary);font-style:italic;}
      .fex-hl-fn{color:#61afef;}
      .fex-hl-type{color:#56b6c2;}
      .fex-hl-tag{color:#e06c75;}
      .fex-hl-attr{color:#d19a66;}
      .fex-note{padding:10px 12px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;}
      .fex-empty{padding:26px 12px;color:var(--dsw-alias-label-secondary);text-align:center;font-size:12.5px;line-height:18px;display:flex;flex-direction:column;align-items:center;gap:10px;}
      .fex-empty svg{width:30px;height:30px;opacity:.45;}
      .fex-btn2{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:7px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);cursor:pointer;font-size:12.5px;line-height:18px;transition:border-color .12s ease,color .12s ease;}
      .fex-btn2:hover{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary);}
      .fex-btn2:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
      .fex-loadmore{display:flex;align-items:center;gap:8px;padding:6px 12px;border-top:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);font-size:11.5px;color:var(--dsw-alias-label-secondary);flex:none;}
      .fex-md{flex:1;overflow:auto;padding:12px 16px;user-select:text;line-height:22px;font-size:13.5px;color:var(--dsw-alias-label-primary);-webkit-font-smoothing:antialiased;}
      .fex-md-p{margin:0 0 10px;}
      .fex-md-h{margin:16px 0 8px;font-weight:600;line-height:1.3;}
      .fex-md-h1{font-size:18px;line-height:26px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:6px;}
      .fex-md-h2{font-size:15px;line-height:22px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:4px;}
      .fex-md-h3{font-size:13.5px;}
      .fex-md-h4{font-size:13px;}
      .fex-md-h5{font-size:12.5px;}
      .fex-md-h6{font-size:12px;color:var(--dsw-alias-label-secondary);}
      .fex-md-toc{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:6px 10px;margin-bottom:12px;background:var(--dsw-alias-bg-layer-1);}
      .fex-md-toc-toggle{border:none;background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;cursor:pointer;padding:2px 4px;border-radius:4px;}
      .fex-md-toc-toggle:hover{color:var(--dsw-alias-brand-primary);}
      .fex-md-toc-list{margin:6px 0 0;padding-left:6px;list-style:none;}
      .fex-md-toc-list a{color:var(--dsw-alias-label-secondary);text-decoration:none;font-size:12px;}
      .fex-md-toc-list a:hover{color:var(--dsw-alias-brand-primary);}
      .fex-md-check{margin-right:5px;color:var(--dsw-alias-label-secondary);}
      .fex-md-check.on{color:#55c285;}
      .fex-md-pre-wrap{margin:0 0 12px;}
      .fex-md-codehead{display:flex;align-items:center;justify-content:space-between;padding:2px 12px 0;font-family:var(--ds-font-family-code);font-size:10.5px;line-height:15px;color:var(--dsw-alias-label-secondary);}
      .fex-md-codehead-lang{opacity:.8;}
      .fex-md-copy{flex:none;padding:0 8px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font-size:10.5px;line-height:16px;cursor:pointer;}
      .fex-md-copy:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .fex-md-copy.done{color:#55c285;border-color:#55c285;}
      .fex-md-pre{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:12px;overflow:auto;margin:0;}
      .fex-md-code{font-family:var(--ds-font-family-code);font-size:12px;line-height:19px;font-variant-ligatures:none;white-space:pre;}
      .fex-md-ic{background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:4px;padding:0 4px;font-family:var(--ds-font-family-code);font-size:11.5px;line-height:17px;}
      .fex-md-quote{border-left:3px solid var(--dsw-alias-brand-primary);margin:0 0 12px;padding:2px 12px;color:var(--dsw-alias-label-secondary);}
      .fex-md-list{margin:0 0 12px;padding-left:22px;}
      .fex-md-list li{margin:2px 0;}
      .fex-md-table{border-collapse:collapse;margin:0 0 12px;font-size:12px;line-height:18px;width:100%;}
      .fex-md-table th,.fex-md-table td{border:1px solid var(--dsw-alias-border-l1);padding:4px 8px;text-align:left;}
      .fex-md-table th{background:var(--dsw-alias-bg-layer-2);font-weight:600;}
      .fex-md-hr{border:none;border-top:1px solid var(--dsw-alias-border-l2);margin:12px 0;}
      .fex-md a{color:#4d9fff;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;}
      .fex-md a:hover{color:#6fb3ff;text-decoration:underline;text-decoration-thickness:1.5px;}
      .fex-md img{max-width:100%;border-radius:6px;}
      .fex-md-toggle{flex:none;padding:1px 8px;border-radius:999px;font-size:10.5px;line-height:15px;cursor:pointer;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);transition:color .12s ease,border-color .12s ease;}
      .fex-md-toggle:hover{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .fex-md-toggle.fex-wrap-on{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .fex-table-wrap{flex:1;overflow:auto;padding:8px 12px;}
      .fex-diff-add{color:#55c285;background:rgba(85,194,133,.1);}
      .fex-diff-del{color:#e06c75;background:rgba(224,108,117,.1);}
      .fex-diff-meta{color:var(--dsw-alias-label-secondary);font-weight:600;}
      .fex-log-error{color:#e06c75;}
      .fex-log-warn{color:#e8a33d;}
      .fex-log-info{color:#61afef;}
      .fex-img-view{flex:1;min-height:0;display:flex;flex-direction:column;}
      .fex-imgbar{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex:none;}
      .fex-imgbar .fex-ibtn{width:24px;height:24px;}
      .fex-imginfo{font-size:11px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;}
      .fex-img{flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;padding:12px;}
      .fex-img img{max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;transform-origin:center center;}
      .fex-palette{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:min(440px, calc(100% - 24px));z-index:200;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-overlay);box-shadow:0 12px 36px rgba(0,0,0,.3);overflow:hidden;}
      .fex-palette-input{width:100%;height:32px;padding:0 12px;border:none;outline:none;background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;border-bottom:1px solid var(--dsw-alias-border-l1);}
      .fex-palette-list{max-height:300px;overflow:auto;padding:4px;}
      .fex-palette-item{display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;cursor:pointer;}
      .fex-palette-item.active{background:var(--dsw-alias-bg-layer-2);}
      .fex-palette-name{flex:none;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;}
      .fex-palette-path{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--ds-font-family-code);font-size:10.5px;color:var(--dsw-alias-label-secondary);opacity:.7;}
      .fex-palette-hint{padding:10px 12px;color:var(--dsw-alias-label-secondary);font-size:12px;text-align:center;}
      .fex-menu-mask{position:fixed;inset:0;z-index:300;}
      .fex-menu{position:fixed;z-index:301;min-width:150px;padding:4px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-overlay);box-shadow:0 8px 28px rgba(0,0,0,.25);}
      .fex-menu-item{display:flex;align-items:center;gap:8px;width:100%;padding:5px 10px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;line-height:18px;cursor:pointer;text-align:left;}
      .fex-menu-item:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);}
      .fex-menu-item svg{color:var(--dsw-alias-label-secondary);}
      .fex-slide-in{animation:fexSlideIn .32s cubic-bezier(.25,.8,.3,1) both;}
      .fex-slide-out{animation:fexSlideOut .3s cubic-bezier(.4,0,1,1) both;}
      .fex-slide-in-left{animation:fexSlideInLeft .3s cubic-bezier(.25,.8,.3,1) both;}
      .fex-tabs-in{animation:fexTabsIn .28s ease-out both;}
      @keyframes fexSlideIn{from{transform:translateX(36px);opacity:.25;}to{transform:translateX(0);opacity:1;}}
      @keyframes fexSlideOut{from{transform:translateX(0);opacity:1;}to{transform:translateX(36px);opacity:.25;}}
      @keyframes fexSlideInLeft{from{transform:translateX(-24px);opacity:.25;}to{transform:translateX(0);opacity:1;}}
      @keyframes fexTabIn{from{transform:translateX(14px);opacity:0;}to{transform:translateX(0);opacity:1;}}
      @keyframes fexTabsIn{from{transform:translateY(-5px);opacity:0;}to{transform:translateY(0);opacity:1;}}
      @media (prefers-reduced-motion: reduce){.fex-slide-in,.fex-slide-out,.fex-slide-in-left,.fex-tabs-in,.fex-tab{animation:none;}}
      .fex-wrap-word{white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;}
      .fex-wrap-any{white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;}
      .fex-wrap-off{white-space:pre;overflow-wrap:normal;word-break:normal;}
      .fex-lines::-webkit-scrollbar,.fex-pre::-webkit-scrollbar,.fex-md::-webkit-scrollbar,.fex-table-wrap::-webkit-scrollbar,.fex-img::-webkit-scrollbar,.fex-tabs::-webkit-scrollbar,.fex-crumbs::-webkit-scrollbar,.fex-palette-list::-webkit-scrollbar{width:8px;height:8px;}
      .fex-lines::-webkit-scrollbar-thumb,.fex-pre::-webkit-scrollbar-thumb,.fex-md::-webkit-scrollbar-thumb,.fex-table-wrap::-webkit-scrollbar-thumb,.fex-img::-webkit-scrollbar-thumb,.fex-tabs::-webkit-scrollbar-thumb,.fex-crumbs::-webkit-scrollbar-thumb,.fex-palette-list::-webkit-scrollbar-thumb{background:var(--dsw-alias-border-l2);border-radius:4px;}
      .fex-lines::-webkit-scrollbar-thumb:hover,.fex-pre::-webkit-scrollbar-thumb:hover,.fex-md::-webkit-scrollbar-thumb:hover,.fex-table-wrap::-webkit-scrollbar-thumb:hover,.fex-img::-webkit-scrollbar-thumb:hover,.fex-tabs::-webkit-scrollbar-thumb:hover,.fex-crumbs::-webkit-scrollbar-thumb:hover,.fex-palette-list::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-label-secondary);}
      .fex-lines::-webkit-scrollbar-track,.fex-pre::-webkit-scrollbar-track,.fex-md::-webkit-scrollbar-track,.fex-table-wrap::-webkit-scrollbar-track,.fex-img::-webkit-scrollbar-track,.fex-tabs::-webkit-scrollbar-track,.fex-crumbs::-webkit-scrollbar-track,.fex-palette-list::-webkit-scrollbar-track{background:transparent;}
      .fex-md-toggle:disabled{opacity:.45;cursor:not-allowed;}
      .fex-notice{position:absolute;left:10px;right:10px;bottom:10px;z-index:250;padding:7px 12px;border-radius:8px;font-size:12px;line-height:18px;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);box-shadow:0 8px 24px rgba(0,0,0,.25);color:var(--dsw-alias-label-primary);}
      .fex-notice.err{color:#e06c75;border-color:#e06c75;}
    `));
  ctx.effect(() => slots.inject(
    "conversation.session.header.actions",
    () => slots.register(
      { name: "conversation.session.header.actions", id: "file-explorer-toggle", order: 15, label: "\u6587\u4EF6" },
      () => {
        const [open, setOpenState] = import_react.default.useState(store.open);
        import_react.default.useEffect(() => {
          const fn = () => setOpenState(store.open);
          store.listeners.add(fn);
          return () => store.listeners.delete(fn);
        }, []);
        const onClick = () => {
          const next = !store.open;
          setOpen(next);
          if (layout) {
            if (next) layout.openDetails();
            else layout.closeDetails();
          }
        };
        return import_react.default.createElement("button", {
          className: "fex-ibtn fex-toggle" + (open ? " active" : ""),
          type: "button",
          onClick,
          title: open ? "\u5173\u95ED\u6587\u4EF6\u6D4F\u89C8\u5668" : "\u6253\u5F00\u6587\u4EF6\u6D4F\u89C8\u5668"
        }, icon(open ? "folderOpen" : "folder"));
      }
    )
  ));
  ctx.effect(() => slots.inject(
    "details",
    () => slots.register({ name: "details", priority: -1 }, () => {
      const KEY = "dsh-filex-state";
      const [root, setRoot] = import_react.default.useState(null);
      const [rootState, setRootState] = import_react.default.useState("loading");
      const [dirs, setDirs] = import_react.default.useState({});
      const [expanded, setExpanded] = import_react.default.useState({});
      const [showHidden, setShowHidden] = import_react.default.useState(false);
      const [query, setQuery] = import_react.default.useState("");
      const [grepMode, setGrepMode] = import_react.default.useState(false);
      const [searching, setSearching] = import_react.default.useState(false);
      const [results, setResults] = import_react.default.useState(null);
      const [tabs, setTabs] = import_react.default.useState([]);
      const [active, setActive] = import_react.default.useState(-1);
      const [leaving, setLeaving] = import_react.default.useState(false);
      const [cursorPath, setCursorPath] = import_react.default.useState(null);
      const [menu, setMenu] = import_react.default.useState(null);
      const [palette, setPalette] = import_react.default.useState(null);
      const [dragTabIdx, setDragTabIdx] = import_react.default.useState(null);
      const [findOpen, setFindOpen] = import_react.default.useState(false);
      const [findQ, setFindQ] = import_react.default.useState("");
      const [findIdx, setFindIdx] = import_react.default.useState(-1);
      const [findMatches, setFindMatches] = import_react.default.useState([]);
      const [imgSize, setImgSize] = import_react.default.useState(null);
      const [jumpTick, setJumpTick] = import_react.default.useState(0);
      const [restored, setRestored] = import_react.default.useState(false);
      const [seq, setSeq] = import_react.default.useState(0);
      const [notice, setNotice] = import_react.default.useState(null);
      const noticeTimer = import_react.default.useRef(null);
      const showNotice = (text, kind) => {
        if (noticeTimer.current) noticeTimer.current();
        setNotice({ text, kind: kind || "ok" });
        noticeTimer.current = timer ? timer.timeout(() => {
          setNotice(null);
          noticeTimer.current = null;
        }, 3500) : null;
      };
      import_react.default.useEffect(() => () => {
        if (noticeTimer.current) noticeTimer.current();
      }, []);
      import_react.default.useEffect(() => {
        let alive = true;
        callRemote("file.root", {}).then((res) => {
          if (!alive) return;
          const r = res && typeof res.root === "string" ? res.root : null;
          setRoot(r);
          setRootState(r ? "ready" : "none");
        }).catch(() => {
          if (alive) setRootState("none");
        });
        return () => {
          alive = false;
        };
      }, []);
      const applyRestore = (data) => {
        if (Array.isArray(data.expanded)) {
          const ex = {};
          data.expanded.forEach((p) => {
            if (typeof p === "string") ex[p] = true;
          });
          setExpanded((prev) => ({ ...prev, ...ex }));
        }
        if (Array.isArray(data.tabs) && data.tabs.length) {
          const ts = data.tabs.filter((t) => t && typeof t.path === "string").map((t) => ({
            path: t.path,
            name: t.name || basenameOf(t.path),
            type: detectType(t.name || basenameOf(t.path)),
            fromLink: false,
            gotoLine: null,
            content: { state: "loading", id: Math.random() },
            view: "pretty",
            wrap: "word",
            img: { scale: 1, rotate: 0 },
            editing: false,
            editText: null
          }));
          if (ts.length) {
            setTabs(ts);
            const act = typeof data.active === "number" && data.active >= 0 && data.active < ts.length ? data.active : -1;
            setActive(act);
            const target = ts[Math.max(act, 0)];
            if (target) fetchContent(target, false);
          }
        }
      };
      import_react.default.useEffect(() => {
        if (restored || rootState !== "ready") return;
        setRestored(true);
        let data = null;
        try {
          const raw = localStorage.getItem(KEY);
          if (raw) data = JSON.parse(raw);
        } catch (err) {
          data = null;
        }
        if (!data) return;
        applyRestore(data);
      }, [rootState, root]);
      import_react.default.useEffect(() => {
        const save = () => {
          try {
            localStorage.setItem(KEY, JSON.stringify({
              root,
              expanded: Object.keys(expanded).filter((k) => expanded[k]),
              tabs: tabs.map((t) => ({ path: t.path, name: t.name })),
              active
            }));
          } catch (err) {
          }
        };
        if (timer) {
          const d = timer.debounce(save, 500);
          d();
          return () => {
            d.dispose();
          };
        }
        save();
        return void 0;
      }, [root, tabs, active, expanded]);
      import_react.default.useEffect(() => {
        if (!root) return;
        setTabs([]);
        setActive(-1);
        setLeaving(false);
        setCursorPath(null);
        setMenu(null);
        setPalette(null);
        setFindOpen(false);
        setFindQ("");
        setFindMatches([]);
        setFindIdx(-1);
        setImgSize(null);
      }, [root]);
      import_react.default.useEffect(() => {
        if (!root) return;
        setRootState((s) => s === "none" ? "ready" : s);
        setDirs({ [root]: { state: "loading" } });
        setExpanded((e) => ({ ...e, [root]: true }));
        callRemote("file.list", { path: root, root }).then((res) => {
          setDirs((d) => ({
            ...d,
            [root]: res && res.ok ? { state: "ready", entries: res.entries } : { state: "error", error: res && (res.error || res.message) || "list failed" }
          }));
        }).catch((err) => {
          setDirs((d) => ({
            ...d,
            [root]: { state: "error", error: err && err.message || String(err) }
          }));
        });
      }, [root, seq]);
      import_react.default.useEffect(() => {
        if (!leaving) return;
        if (!timer) {
          setActive(-1);
          setLeaving(false);
          return;
        }
        const d = timer.timeout(() => {
          setActive(-1);
          setLeaving(false);
        }, 360);
        return () => {
          d();
        };
      }, [leaving]);
      import_react.default.useEffect(() => {
        const q = query.trim();
        if (!root || !q) {
          setResults(null);
          setSearching(false);
          return;
        }
        let alive = true;
        setSearching(true);
        const rpc = grepMode ? "file.grep" : "file.search";
        const family = (grepMode ? "grep:" : "search:") + root;
        const run = () => {
          callRemote(rpc, { root, query: q, family }).then((res) => {
            if (!alive) return;
            setResults(res && res.ok ? res.results : []);
            setSearching(false);
          }).catch(() => {
            if (alive) {
              setResults([]);
              setSearching(false);
            }
          });
        };
        if (timer) {
          const d = timer.debounce(run, 250);
          d();
          return () => {
            alive = false;
            d.dispose();
          };
        }
        run();
        return () => {
          alive = false;
        };
      }, [root, query, grepMode]);
      import_react.default.useEffect(() => {
        if (!palette || !root) return;
        const q = palette.q.trim();
        if (!q) {
          setPalette({ ...palette, results: [], idx: 0 });
          return;
        }
        let alive = true;
        callRemote("file.search", { root, query: q, family: "palette:" + root }).then((res) => {
          if (!alive) return;
          setPalette((p) => p && p.q === palette.q ? { ...p, results: res && res.ok ? res.results.slice(0, 50) : [], idx: 0 } : p);
        }).catch(() => {
        });
        return () => {
          alive = false;
        };
      }, [palette ? palette.q : null, root]);
      import_react.default.useEffect(() => {
        if (root && store.pendingFile) {
          const p = store.pendingFile;
          store.pendingFile = null;
          openFile(p, basenameOf(p), true);
        }
        const fn = (path) => openFile(path, basenameOf(path), true);
        store.fileListeners.add(fn);
        return () => {
          store.fileListeners.delete(fn);
        };
      }, [root]);
      import_react.default.useEffect(() => {
        const tab = active >= 0 && active < tabs.length ? tabs[active] : null;
        const text = tab && tab.content && tab.content.state === "ready" && tab.content.kind !== "hex" ? tab.content.text : "";
        const q = findQ.toLowerCase();
        if (!findOpen || !q || typeof text !== "string" || !text) {
          setFindMatches([]);
          setFindIdx(-1);
          return;
        }
        const ls = text.split("\n");
        const ms = [];
        ls.forEach((l, li) => {
          const low = l.toLowerCase();
          let ci = low.indexOf(q);
          while (ci !== -1) {
            ms.push({ line: li, col: ci, len: q.length });
            ci = low.indexOf(q, ci + q.length);
          }
        });
        setFindMatches(ms);
        setFindIdx((prev) => ms.length ? prev < 0 ? 0 : Math.min(prev, ms.length - 1) : -1);
      }, [findOpen, findQ, active, tabs]);
      import_react.default.useEffect(() => {
        if (!findOpen || !activeTab) return;
        const m = findMatches[findIdx];
        if (!m) return;
        const cont = document.querySelector('[data-fex-path="' + escAttr(activeTab.path) + '"]');
        const row = cont && cont.querySelector('[data-ln="' + m.line + '"]');
        if (row && row.scrollIntoView) row.scrollIntoView({ block: "center" });
      }, [findIdx, findOpen]);
      import_react.default.useEffect(() => {
        const tab = activeTab;
        if (!tab || !tab.gotoLine || !tab.content || tab.content.state !== "ready") return;
        const cont = document.querySelector('[data-fex-path="' + tab.path + '"]');
        const row = cont && cont.querySelector('[data-ln="' + (tab.gotoLine - 1) + '"]');
        if (row) {
          row.scrollIntoView({ block: "center" });
          setTabs((ts) => ts.map((t) => t.path === tab.path ? Object.assign({}, t, { gotoLine: null }) : t));
        } else if (cont && typeof cont.scrollTop === "number") {
          cont.scrollTop = Math.max(0, (tab.gotoLine - 1) * LINE_H - 100);
          setJumpTick((t) => t + 1);
        } else {
          setTabs((ts) => ts.map((t) => t.path === tab.path ? Object.assign({}, t, { gotoLine: null }) : t));
        }
      }, [active, tabs, jumpTick]);
      const toggleDir = (path) => {
        const next = !expanded[path];
        setExpanded((e) => ({ ...e, [path]: next }));
        if (next && !dirs[path]) {
          setDirs((d) => ({ ...d, [path]: { state: "loading" } }));
          callRemote("file.list", { path, root }).then((res) => {
            setDirs((d) => ({
              ...d,
              [path]: res && res.ok ? { state: "ready", entries: res.entries } : { state: "error", error: res && (res.error || res.message) || "list failed" }
            }));
          }).catch((err) => {
            setDirs((d) => ({
              ...d,
              [path]: { state: "error", error: err && err.message || String(err) }
            }));
          });
        }
      };
      const fetchContent = (tab, fromLink) => {
        const rpc = tab.type === "image" ? "file.readImage" : "file.read";
        const args = fromLink ? { path: tab.path } : { path: tab.path, root };
        callRemote(rpc, args).then((res) => {
          setTabs((ts) => ts.map((t) => {
            if (t.path !== tab.path || !t.content || t.content.id !== tab.content.id) return t;
            if (res && res.ok) {
              return Object.assign({}, t, { content: Object.assign({ state: "ready", id: t.content.id }, res, { offset: res.text ? res.text.length : 0, eof: !res.truncated }) });
            }
            if (res && res.kind === "binary") {
              callRemote("file.readHex", args).then((hr) => {
                setTabs((ts2) => ts2.map(
                  (t2) => t2.path === tab.path && t2.content && t2.content.id === tab.content.id ? Object.assign({}, t2, { content: hr && hr.ok ? { state: "ready", kind: "hex", id: t2.content.id, bytes: hr.bytes, size: hr.size, hexTruncated: !!hr.truncated } : { state: "error", kind: hr && hr.kind || "error", message: hr && hr.message } }) : t2
                ));
              });
              return t;
            }
            return Object.assign({}, t, { content: { state: "error", kind: res && res.kind, message: res && (res.message || res.error) } });
          }));
        }).catch((err) => {
          setTabs((ts) => ts.map(
            (t) => t.path === tab.path && t.content && t.content.id === tab.content.id ? Object.assign({}, t, { content: { state: "error", kind: "error", message: err && err.message || String(err) } }) : t
          ));
        });
      };
      const openFile = (path, name, fromLink, line) => {
        setLeaving(false);
        setImgSize(null);
        setPalette(null);
        const idx = tabs.findIndex((t) => t.path === path);
        if (idx >= 0) {
          setActive(idx);
          return;
        }
        const typ = detectType(name);
        const id = Math.random();
        const tab = { path, name, type: typ, fromLink: !!fromLink, gotoLine: typeof line === "number" ? line : null, content: { state: "loading", id }, view: "pretty", wrap: "word", img: { scale: 1, rotate: 0 }, editing: false, editText: null };
        setTabs((ts) => [...ts, tab]);
        setActive(tabs.length);
        fetchContent(tab, fromLink);
      };
      const loadMore = (tab) => {
        if (!tab.content || tab.content.eof) return;
        const off = tab.content.offset || 0;
        const args = tab.fromLink ? { path: tab.path, offset: off } : { path: tab.path, root, offset: off };
        callRemote("file.readMore", args).then((res) => {
          setTabs((ts) => ts.map((t) => {
            if (t.path !== tab.path || !t.content) return t;
            if (res && res.ok) {
              return Object.assign({}, t, { content: Object.assign({}, t.content, { text: t.content.text + res.text, offset: res.newOffset, eof: res.eof }) });
            }
            return t;
          }));
          if (res && !res.ok) {
            showNotice("\u52A0\u8F7D\u66F4\u591A\u5931\u8D25\uFF1A" + (res.message || res.error || "\u672A\u77E5\u9519\u8BEF"), "error");
          }
        }).catch((err) => {
          showNotice("\u52A0\u8F7D\u66F4\u591A\u5931\u8D25\uFF1A" + (err && err.message || String(err)), "error");
        });
      };
      const saveEdit = (tab) => {
        if (typeof tab.editText !== "string") return;
        const args = {
          path: tab.path,
          root,
          text: tab.editText,
          expectedVersion: tab.content && tab.content.version
        };
        callRemote("file.write", args).then((res) => {
          if (res && res.ok) {
            setTabs((ts) => ts.map((t) => t.path === tab.path ? Object.assign({}, t, {
              editing: false,
              editText: null,
              content: Object.assign({}, t.content, { text: tab.editText, offset: tab.editText.length, eof: true, truncated: false, version: res.version })
            }) : t));
            showNotice("\u5DF2\u4FDD\u5B58\uFF1A" + tab.name, "ok");
          } else if (res && res.kind === "stale") {
            showNotice("\u4FDD\u5B58\u88AB\u62D2\u7EDD\uFF1A\u6587\u4EF6\u5DF2\u88AB\u5176\u4ED6\u7A0B\u5E8F\u4FEE\u6539\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u540E\u518D\u7F16\u8F91\u3002", "error");
          } else {
            showNotice("\u4FDD\u5B58\u5931\u8D25\uFF1A" + (res && (res.message || res.error) || "\u672A\u77E5\u9519\u8BEF"), "error");
          }
        }).catch((err) => {
          showNotice("\u4FDD\u5B58\u5931\u8D25\uFF1A" + (err && err.message || String(err)), "error");
        });
      };
      const reorderTabs = (from, to) => {
        if (from === to || from === null) return;
        setTabs((ts) => {
          const next = ts.slice();
          const [moved] = next.splice(from, 1);
          next.splice(to, 0, moved);
          return next;
        });
        setActive((cur) => {
          if (cur === from) return to;
          if (cur === to) return from;
          if (from < cur && to >= cur) return cur - 1;
          if (from > cur && to <= cur) return cur + 1;
          return cur;
        });
        setDragTabIdx(null);
      };
      const closeTab = (idx) => {
        const next = tabs.filter((_, i) => i !== idx);
        setTabs(next);
        if (active === idx) {
          if (next.length === 0) setActive(-1);
          else setActive(Math.min(idx, next.length - 1));
        } else if (active > idx) {
          setActive(active - 1);
        }
      };
      const switchRoot = async () => {
        if (!workspaces) return;
        try {
          const picked = await workspaces.pickDirectory();
          if (picked) {
            setRoot(picked);
            setRootState("ready");
            if (picked !== root) setSeq((s) => s + 1);
          }
        } catch (err) {
          showNotice("\u9009\u62E9\u76EE\u5F55\u5931\u8D25\uFF1A" + (err && err.message || String(err)), "error");
        }
      };
      const closePanel = () => {
        setOpen(false);
        if (layout) layout.closeDetails();
      };
      const fmt = (n) => {
        if (n === null || n === void 0) return "";
        if (n < 1024) return n + " B";
        if (n < 1048576) return (n / 1024).toFixed(1) + " KB";
        return (n / 1048576).toFixed(1) + " MB";
      };
      const filtered = (entries) => {
        let list = showHidden ? entries : entries.filter((e) => !e.name.startsWith("."));
        const q = query.trim().toLowerCase();
        if (q) list = list.filter((e) => e.name.toLowerCase().includes(q));
        return list;
      };
      const fileIcon = (name, isDir, open) => {
        if (isDir) return icon(open ? "folderOpen" : "folder");
        const c = extColor(name);
        return import_react.default.createElement("span", { style: c ? { color: c } : null }, icon("file"));
      };
      const activeTab = active >= 0 && active < tabs.length ? tabs[active] : null;
      const currentMatch = findMatches.length && findIdx >= 0 && findIdx < findMatches.length ? findMatches[findIdx] : null;
      const flattenVisible = () => {
        const out = [];
        const walk = (path) => {
          const info = dirs[path];
          if (info && info.state === "ready" && expanded[path]) {
            filtered(info.entries).forEach((e) => {
              out.push({ path: e.path, name: e.name, isDir: e.type === "directory" });
              if (e.type === "directory" && expanded[e.path]) walk(e.path);
            });
          }
        };
        if (root && expanded[root]) walk(root);
        return out;
      };
      const flatList = () => query.trim() ? (results || []).map((r) => ({ path: grepMode ? r.path + ":" + r.line : r.path, name: r.name, isDir: false, line: grepMode ? r.line : void 0 })) : flattenVisible();
      const moveCursor = (delta) => {
        const list = flatList();
        if (!list.length) return;
        let idx = list.findIndex((x) => x.path === cursorPath);
        if (idx === -1) idx = 0;
        const ni = Math.max(0, Math.min(list.length - 1, idx + delta));
        setCursorPath(list[ni].path);
      };
      const openCursor = () => {
        const it = flatList().find((x) => x.path === cursorPath);
        if (!it) return;
        if (it.isDir) toggleDir(it.path);
        else openFile(it.path, it.name, false, it.line);
      };
      const arrowHorizontal = (right) => {
        const it = flatList().find((x) => x.path === cursorPath);
        if (!it) return;
        if (right && it.isDir) toggleDir(it.path);
        else if (!right && it.isDir) setExpanded((e) => ({ ...e, [it.path]: false }));
        else if (!right) setCursorPath(parentOf(it.path));
      };
      import_react.default.useEffect(() => {
        const fn = (e) => {
          if (e.target && e.target.tagName === "INPUT") return false;
          const k = e.key.toLowerCase();
          if (e.ctrlKey && k === "f") {
            setFindOpen(true);
            setFindIdx(0);
            return true;
          }
          if (e.ctrlKey && k === "p") {
            setPalette({ q: "", results: [], idx: 0 });
            return true;
          }
          if (e.ctrlKey && k === "t") {
            if (tabs.length) {
              setLeaving(false);
              setActive((active + 1) % tabs.length);
            }
            return true;
          }
          if (e.ctrlKey && e.shiftKey && k === "t") {
            if (tabs.length) {
              setLeaving(false);
              setActive((active - 1 + tabs.length) % tabs.length);
            }
            return true;
          }
          if (e.ctrlKey && k === "s") {
            const t = active >= 0 && active < tabs.length ? tabs[active] : null;
            if (t && t.editing) {
              e.preventDefault();
              saveEdit(t);
              return true;
            }
            return false;
          }
          if (e.ctrlKey && k === "w") {
            if (active >= 0) {
              e.preventDefault();
              closeTab(active);
              return true;
            }
            return false;
          }
          if (e.key === "Escape") {
            if (palette) {
              setPalette(null);
              return true;
            }
            if (menu) {
              setMenu(null);
              return true;
            }
            if (findOpen) {
              setFindOpen(false);
              return true;
            }
            if (active >= 0) {
              setLeaving(true);
              return true;
            }
            if (query) {
              setQuery("");
              return true;
            }
            return false;
          }
          if (active >= 0) return false;
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            moveCursor(e.key === "ArrowDown" ? 1 : -1);
            return true;
          }
          if (e.key === "ArrowRight") {
            arrowHorizontal(true);
            return true;
          }
          if (e.key === "ArrowLeft") {
            arrowHorizontal(false);
            return true;
          }
          if (e.key === "Enter") {
            openCursor();
            return true;
          }
          return false;
        };
        store.keyListeners.add(fn);
        return () => {
          store.keyListeners.delete(fn);
        };
      }, [cursorPath, query, grepMode, results, tabs, active, findOpen, palette, menu, leaving, dirs, expanded, root, showHidden]);
      const openMenu = (e, path, name, isDir) => {
        e.preventDefault();
        e.stopPropagation();
        setMenu({ x: e.clientX, y: e.clientY, path, name, isDir });
      };
      const menuItem = (label, ico, onClick) => import_react.default.createElement("button", {
        className: "fex-menu-item",
        type: "button",
        onClick: () => {
          onClick();
          setMenu(null);
        }
      }, icon(ico), label);
      const renderRows = (path, depth) => {
        const info = dirs[path];
        const rows = [];
        if (info && info.state === "ready") {
          const list = filtered(info.entries).slice(0, TREE_SLICE);
          const extra = info.entries.length - list.length;
          list.forEach((e) => {
            const isDir = e.type === "directory";
            const eOpen = isDir && !!expanded[e.path];
            rows.push(import_react.default.createElement(
              "div",
              {
                key: e.path,
                className: "fex-row" + (activeTab && activeTab.path === e.path ? " selected" : "") + (cursorPath === e.path ? " cursor" : ""),
                style: { paddingLeft: 6 + depth * 16 },
                title: e.path,
                onClick: () => isDir ? toggleDir(e.path) : openFile(e.path, e.name, false),
                onContextMenu: (ev) => openMenu(ev, e.path, e.name, isDir)
              },
              import_react.default.createElement("span", { className: "fex-caret" + (eOpen ? " open" : "") }, isDir ? icon("caret") : null),
              import_react.default.createElement("span", { className: "fex-ico" + (isDir ? " dir" : "") }, fileIcon(e.name, isDir, eOpen)),
              import_react.default.createElement("span", { className: "fex-name" }, e.name),
              import_react.default.createElement("span", { className: "fex-size" }, fmt(e.size))
            ));
            if (isDir && eOpen) rows.push(...renderRows(e.path, depth + 1));
          });
          if (extra > 0) {
            rows.push(import_react.default.createElement(
              "div",
              { key: "__more", className: "fex-note", style: { paddingLeft: 8 + depth * 16 } },
              "\u2026 \u8FD8\u6709 " + extra + " \u9879\u672A\u663E\u793A"
            ));
          }
        } else if (info && info.state === "loading") {
          rows.push(import_react.default.createElement(
            "div",
            { key: "__loading", className: "fex-note", style: { paddingLeft: 8 + depth * 16 } },
            "\u52A0\u8F7D\u4E2D\u2026"
          ));
        } else if (info && info.state === "error") {
          rows.push(import_react.default.createElement(
            "div",
            { key: "__error", className: "fex-note", style: { paddingLeft: 8 + depth * 16 } },
            "\u52A0\u8F7D\u5931\u8D25: " + info.error
          ));
        }
        return rows;
      };
      let treeContent;
      if (rootState === "loading") {
        treeContent = import_react.default.createElement("div", { className: "fex-empty" }, icon("folderOpen"), import_react.default.createElement("span", null, "\u6B63\u5728\u786E\u5B9A\u6839\u76EE\u5F55\u2026"));
      } else if (rootState === "none") {
        treeContent = import_react.default.createElement(
          "div",
          { className: "fex-empty" },
          icon("folderOpen"),
          import_react.default.createElement("span", null, "\u672A\u9009\u62E9\u76EE\u5F55"),
          import_react.default.createElement("button", { className: "fex-btn2", type: "button", onClick: switchRoot }, icon("folderPlus"), "\u9009\u62E9\u76EE\u5F55")
        );
      } else if (query.trim()) {
        if (searching) {
          treeContent = import_react.default.createElement("div", { className: "fex-empty" }, icon("search"), import_react.default.createElement("span", null, "\u641C\u7D22\u4E2D\u2026"));
        } else if (results && results.length) {
          treeContent = import_react.default.createElement(
            import_react.default.Fragment,
            null,
            results.map(
              (r) => grepMode ? import_react.default.createElement(
                "div",
                {
                  key: r.path + ":" + r.line,
                  className: "fex-row" + (cursorPath === r.path + ":" + r.line ? " cursor" : ""),
                  title: r.path,
                  onClick: () => openFile(r.path, r.name, false, r.line),
                  onContextMenu: (ev) => openMenu(ev, r.path, r.name, false)
                },
                import_react.default.createElement("span", { className: "fex-ico" }, fileIcon(r.name, false, false)),
                import_react.default.createElement("span", { className: "fex-name" }, r.name),
                import_react.default.createElement("span", { className: "fex-grep-line" }, ":" + r.line),
                import_react.default.createElement("span", { className: "fex-grep-snippet" }, r.text)
              ) : import_react.default.createElement(
                "div",
                {
                  key: r.path,
                  className: "fex-row" + (cursorPath === r.path ? " cursor" : ""),
                  style: { paddingLeft: 6 },
                  title: r.path,
                  onClick: () => openFile(r.path, r.name, false),
                  onContextMenu: (ev) => openMenu(ev, r.path, r.name, false)
                },
                import_react.default.createElement("span", { className: "fex-ico" }, fileIcon(r.name, false, false)),
                import_react.default.createElement("span", { className: "fex-name" }, r.name)
              )
            ),
            results.length >= 300 ? import_react.default.createElement("div", { key: "__cap", className: "fex-note" }, "\u7ED3\u679C\u5DF2\u8FBE\u4E0A\u9650\uFF08300\uFF09\uFF0C\u8BF7\u7F29\u5C0F\u5173\u952E\u8BCD") : null
          );
        } else {
          treeContent = import_react.default.createElement("div", { className: "fex-empty" }, icon("search"), import_react.default.createElement("span", null, "\u65E0\u5339\u914D" + (grepMode ? "\u5185\u5BB9" : "\u6587\u4EF6")));
        }
      } else {
        const rootOpen = !!expanded[root];
        treeContent = import_react.default.createElement(
          import_react.default.Fragment,
          null,
          import_react.default.createElement(
            "div",
            { className: "fex-row", style: { paddingLeft: 6 }, title: root, onClick: () => toggleDir(root) },
            import_react.default.createElement("span", { className: "fex-caret" + (rootOpen ? " open" : "") }, icon("caret")),
            import_react.default.createElement("span", { className: "fex-ico dir" }, icon(rootOpen ? "folderOpen" : "folder")),
            import_react.default.createElement("span", { className: "fex-name" }, root)
          ),
          rootOpen ? renderRows(root, 1) : null
        );
      }
      let headEl;
      let bodyEl;
      if (active < 0) {
        const crumbs = root ? crumbSegments(root) : [];
        headEl = import_react.default.createElement(
          "div",
          { className: "fex-head" },
          import_react.default.createElement("span", { className: "fex-title" }, icon("folder"), "\u6587\u4EF6\u6D4F\u89C8\u5668"),
          import_react.default.createElement("button", {
            className: "fex-searchmode" + (grepMode ? " on" : ""),
            type: "button",
            title: "\u641C\u7D22\u8303\u56F4\uFF1A" + (grepMode ? "\u6587\u4EF6\u5185\u5BB9" : "\u6587\u4EF6\u540D") + "\uFF08\u70B9\u51FB\u5207\u6362\uFF09",
            onClick: () => {
              setGrepMode((m) => !m);
              setResults(null);
            }
          }, grepMode ? "\u5185\u5BB9" : "\u6587\u4EF6\u540D"),
          import_react.default.createElement("input", {
            className: "fex-search",
            type: "text",
            placeholder: root || "\u672A\u9009\u62E9\u76EE\u5F55",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Escape") setQuery("");
            },
            spellCheck: false
          }),
          import_react.default.createElement(
            "div",
            { className: "fex-actions" },
            import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u5207\u6362\u76EE\u5F55", onClick: switchRoot }, icon("folderPlus")),
            import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u5237\u65B0", onClick: () => setSeq((s) => s + 1) }, icon("refresh")),
            import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: showHidden ? "\u9690\u85CF\u70B9\u5F00\u5934\u6761\u76EE" : "\u663E\u793A\u70B9\u5F00\u5934\u6761\u76EE", onClick: () => setShowHidden((h) => !h) }, icon(showHidden ? "eyeOff" : "eye")),
            import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u5173\u95ED", onClick: closePanel }, icon("x"))
          )
        );
        const crumbEl = import_react.default.createElement(
          "div",
          { className: "fex-crumbs" },
          crumbs.map((c, i) => import_react.default.createElement(
            import_react.default.Fragment,
            { key: i },
            i > 0 ? import_react.default.createElement("span", { className: "fex-crumb-sep" }, "\u203A") : null,
            import_react.default.createElement("button", {
              className: "fex-crumb" + (i === crumbs.length - 1 ? " current" : ""),
              type: "button",
              onClick: i < crumbs.length - 1 ? () => {
                setRoot(c.path);
                setSeq((s) => s + 1);
              } : void 0
            }, c.label)
          ))
        );
        bodyEl = import_react.default.createElement(
          import_react.default.Fragment,
          null,
          crumbEl,
          import_react.default.createElement("div", { className: "fex-tree fex-slide-in-left" }, treeContent)
        );
      } else {
        const tab = activeTab;
        const wrapCls = tab.wrap === "word" ? "fex-wrap-word" : tab.wrap === "any" ? "fex-wrap-any" : "fex-wrap-off";
        const tabStrip = import_react.default.createElement(
          "div",
          { className: "fex-tabs fex-tabs-in" },
          tabs.map((t, i) => import_react.default.createElement(
            "div",
            {
              key: t.path,
              className: "fex-tab" + (i === active ? " active" : "") + (dragTabIdx === i ? " dragging" : ""),
              onClick: () => {
                setLeaving(false);
                setActive(i);
              },
              onContextMenu: (ev) => openMenu(ev, t.path, t.name, false),
              draggable: true,
              onDragStart: (e) => {
                setDragTabIdx(i);
                try {
                  e.dataTransfer.setData("text/plain", String(i));
                  e.dataTransfer.effectAllowed = "move";
                } catch (err) {
                }
              },
              onDragOver: (e) => e.preventDefault(),
              onDrop: (e) => {
                e.preventDefault();
                reorderTabs(dragTabIdx, i);
              },
              onDragEnd: () => setDragTabIdx(null),
              title: t.path
            },
            import_react.default.createElement("span", { className: "fex-tab-name" }, t.name),
            import_react.default.createElement("button", {
              className: "fex-tab-x",
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                closeTab(i);
              }
            }, icon("x"))
          ))
        );
        const headChildren = [
          import_react.default.createElement("button", {
            key: "b",
            className: "fex-ibtn",
            type: "button",
            title: "\u8FD4\u56DE\u76EE\u5F55",
            onClick: () => setLeaving(true)
          }, icon("back")),
          import_react.default.createElement("span", { key: "i", className: "fex-ico" }, fileIcon(tab.name, false, false)),
          import_react.default.createElement("span", { key: "n", className: "fex-preview-name" }, tab.name)
        ];
        const content = tab.content;
        if (content && content.state === "ready" && content.size !== null && content.size !== void 0) {
          headChildren.push(import_react.default.createElement("span", { key: "s", className: "fex-badge" }, fmt(content.size)));
        }
        if (content && content.state === "ready" && content.kind !== "hex" && content.truncated && !tab.editing) {
          headChildren.push(import_react.default.createElement("span", { key: "t", className: "fex-badge warn" }, "\u5DF2\u622A\u65AD " + PREVIEW_KB + "KB"));
        }
        const wrapable = tab.type === "code" || tab.type === "json" || tab.type === "text" || tab.type === "diff" || tab.type === "log" || tab.type === "markdown";
        if (tab.editing) {
          headChildren.push(import_react.default.createElement("button", {
            key: "sv",
            className: "fex-md-toggle fex-wrap-on",
            type: "button",
            title: "\u4FDD\u5B58\u4FEE\u6539 (Ctrl+S)",
            onClick: () => saveEdit(tab)
          }, "\u4FDD\u5B58"));
          headChildren.push(import_react.default.createElement("button", {
            key: "cc",
            className: "fex-md-toggle",
            type: "button",
            onClick: () => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { editing: false, editText: null }) : t))
          }, "\u53D6\u6D88"));
        } else if (content && content.state === "ready" && content.kind !== "hex" && wrapable) {
          const notFullyLoaded = content.truncated || content.offset > 0 && !content.eof;
          headChildren.push(import_react.default.createElement("button", {
            key: "e",
            className: "fex-md-toggle",
            type: "button",
            disabled: notFullyLoaded,
            title: notFullyLoaded ? "\u6587\u4EF6\u672A\u5B8C\u6574\u52A0\u8F7D\uFF0C\u7F16\u8F91\u5E76\u4FDD\u5B58\u4F1A\u622A\u65AD\u6587\u4EF6 \u2014\u2014 \u8BF7\u5148\u300C\u52A0\u8F7D\u66F4\u591A\u300D\u81F3\u5B8C\u6574\u540E\u518D\u7F16\u8F91" : "\u7F16\u8F91\u6587\u4EF6",
            onClick: notFullyLoaded ? void 0 : () => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { editing: true, editText: t.content && t.content.text || "" }) : t))
          }, icon("edit")));
          headChildren.push(import_react.default.createElement("button", {
            key: "w",
            className: "fex-md-toggle" + (tab.wrap !== "off" ? " fex-wrap-on" : ""),
            type: "button",
            title: "\u6362\u884C\uFF1A\u667A\u80FD\u6298\u884C \u2192 \u5F3A\u5236\u6298\u884C \u2192 \u539F\u6837",
            onClick: () => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { wrap: t.wrap === "word" ? "any" : t.wrap === "any" ? "off" : "word" }) : t))
          }, tab.wrap === "word" ? "\u5F3A\u5236" : tab.wrap === "any" ? "\u539F\u6837" : "\u6298\u884C"));
          headChildren.push(import_react.default.createElement("button", {
            key: "v",
            className: "fex-md-toggle",
            type: "button",
            onClick: () => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { view: t.view === "pretty" ? "raw" : "pretty" }) : t))
          }, tab.view === "pretty" ? "\u539F\u6587" : tab.type === "markdown" ? "\u6E32\u67D3" : "\u7F8E\u5316"));
        }
        headChildren.push(import_react.default.createElement(
          "div",
          { key: "a", className: "fex-actions" },
          import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u67E5\u627E (Ctrl+F)", onClick: () => {
            setFindOpen(true);
            setFindIdx(0);
          } }, icon("search")),
          import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u5173\u95ED", onClick: closePanel }, icon("x"))
        ));
        headEl = import_react.default.createElement("div", { className: "fex-head" }, headChildren);
        let body;
        let loadBar = null;
        if (!content || content.state === "loading") {
          body = import_react.default.createElement("div", { className: "fex-note" }, "\u8BFB\u53D6\u4E2D\u2026");
        } else if (tab.editing) {
          body = import_react.default.createElement("textarea", {
            className: "fex-edit",
            value: tab.editText || "",
            spellCheck: false,
            onChange: (e) => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { editText: e.target.value }) : t))
          });
        } else if (content.state === "ready") {
          if (content.kind === "hex") {
            body = import_react.default.createElement(
              import_react.default.Fragment,
              null,
              import_react.default.createElement("div", { className: "fex-note" }, content.hexTruncated ? "\u4E8C\u8FDB\u5236\u6587\u4EF6\u8F83\u5927\uFF0C\u4EC5\u663E\u793A\u524D 256KB" : "\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF08Hex \u89C6\u56FE\uFF09"),
              renderHex(content.bytes, tab.path)
            );
          } else if (tab.type === "image") {
            const imgState = tab.img || { scale: 1, rotate: 0 };
            const patchImg = (p) => setTabs((ts) => ts.map((t, i) => i === active ? Object.assign({}, t, { img: Object.assign({ scale: 1, rotate: 0 }, t.img || {}, p) }) : t));
            const downloadImg = () => {
              try {
                const a = document.createElement("a");
                a.href = content.dataUrl;
                a.download = tab.name;
                document.body.appendChild(a);
                a.click();
                a.remove();
              } catch (err) {
              }
            };
            body = import_react.default.createElement(
              "div",
              { className: "fex-img-view" },
              import_react.default.createElement(
                "div",
                { className: "fex-imgbar" },
                import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u7F29\u5C0F", onClick: () => patchImg({ scale: Math.max(0.2, Math.round(imgState.scale * 0.8 * 100) / 100) }) }, icon("zoomOut")),
                import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u653E\u5927", onClick: () => patchImg({ scale: Math.min(8, Math.round(imgState.scale * 1.25 * 100) / 100) }) }, icon("zoomIn")),
                import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u5B9E\u9645\u5927\u5C0F", onClick: () => patchImg({ scale: 1, rotate: 0 }) }, "1:1"),
                import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u65CB\u8F6C 90\xB0", onClick: () => patchImg({ rotate: (imgState.rotate + 90) % 360 }) }, icon("rotate")),
                import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u4E0B\u8F7D", onClick: downloadImg }, icon("download")),
                import_react.default.createElement("span", { className: "fex-imginfo" }, Math.round(imgState.scale * 100) + "%"),
                imgSize ? import_react.default.createElement("span", { className: "fex-imginfo" }, imgSize.w + " \xD7 " + imgSize.h) : null
              ),
              import_react.default.createElement(
                "div",
                { className: "fex-img" },
                import_react.default.createElement("img", {
                  src: content.dataUrl,
                  alt: tab.name,
                  onLoad: (e) => {
                    try {
                      setImgSize({ w: e.target.naturalWidth, h: e.target.naturalHeight });
                    } catch (err) {
                    }
                  },
                  style: {
                    transform: "rotate(" + imgState.rotate + "deg) scale(" + imgState.scale + ")",
                    transition: "transform .15s ease"
                  }
                })
              )
            );
          } else {
            const typ = tab.type;
            const mark = currentMatch;
            if (tab.view === "pretty") {
              if (typ === "markdown" || typ === "csv" || typ === "tsv") {
                body = renderPretty(tab, content);
              } else if (typ === "diff") {
                body = renderDiff(content.text, wrapCls, tab.path);
              } else if (typ === "log") {
                body = renderLog(content.text, wrapCls, tab.path);
              } else if (typ === "json") {
                let pretty = null;
                try {
                  pretty = JSON.stringify(JSON.parse(content.text), null, 2);
                } catch (e) {
                  pretty = null;
                }
                body = renderLines(pretty || content.text, wrapCls, "json", mark, tab.path);
              } else if (typ === "code") {
                body = renderLines(content.text, wrapCls, langKeyOf(extOf(tab.name)), mark, tab.path);
              } else {
                body = renderLines(content.text, wrapCls, null, mark, tab.path);
              }
            } else {
              body = renderLines(content.text, wrapCls, null, mark, tab.path);
            }
            if (content.offset > 0 && !content.eof && typ !== "markdown" && typ !== "csv" && typ !== "tsv") {
              loadBar = import_react.default.createElement(
                "div",
                { className: "fex-loadmore" },
                import_react.default.createElement("span", null, "\u5DF2\u52A0\u8F7D " + fmt(content.offset) + "\uFF0C"),
                import_react.default.createElement("button", { className: "fex-btn2", type: "button", onClick: () => loadMore(tab) }, "\u52A0\u8F7D\u66F4\u591A")
              );
            }
          }
        } else {
          const kindText = content.kind === "binary" ? "\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF0C\u65E0\u6CD5\u9884\u89C8" : content.kind === "too-large" ? "\u6587\u4EF6\u8FC7\u5927" : content.kind === "missing" ? "\u6587\u4EF6\u4E0D\u5B58\u5728" : content.kind === "not-file" ? "\u4E0D\u662F\u666E\u901A\u6587\u4EF6" : content.kind === "denied" ? "\u6743\u9650\u4E0D\u8DB3" : "\u8BFB\u53D6\u5931\u8D25";
          body = import_react.default.createElement("div", { className: "fex-note" }, kindText + (content.message ? "\uFF1A" + content.message : ""));
        }
        const findBar = findOpen && !tab.editing ? import_react.default.createElement(
          "div",
          { className: "fex-findbar" },
          import_react.default.createElement("input", {
            className: "fex-find-input",
            type: "text",
            value: findQ,
            placeholder: "\u5728\u6587\u4EF6\u4E2D\u67E5\u627E\u2026",
            autoFocus: true,
            spellCheck: false,
            onChange: (e) => {
              setFindQ(e.target.value);
              setFindIdx(0);
            },
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (findMatches.length) setFindIdx((i) => e.shiftKey ? (i - 1 + findMatches.length) % findMatches.length : (i + 1) % findMatches.length);
              }
              if (e.key === "Escape") setFindOpen(false);
            }
          }),
          import_react.default.createElement("span", { className: "fex-find-count" }, findMatches.length ? findIdx + 1 + " / " + findMatches.length : "0"),
          import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u4E0A\u4E00\u4E2A (Shift+Enter)", onClick: () => findMatches.length && setFindIdx((i) => (i - 1 + findMatches.length) % findMatches.length) }, "\u2191"),
          import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u4E0B\u4E00\u4E2A (Enter)", onClick: () => findMatches.length && setFindIdx((i) => (i + 1) % findMatches.length) }, "\u2193"),
          import_react.default.createElement("button", { className: "fex-ibtn", type: "button", title: "\u5173\u95ED (Esc)", onClick: () => setFindOpen(false) }, icon("x"))
        ) : null;
        bodyEl = import_react.default.createElement(
          import_react.default.Fragment,
          null,
          tabStrip,
          findBar,
          import_react.default.createElement("div", {
            key: String(active),
            className: "fex-content " + (leaving ? "fex-slide-out" : "fex-slide-in")
          }, body, loadBar)
        );
      }
      const paletteEl = palette ? import_react.default.createElement(
        "div",
        { className: "fex-palette" },
        import_react.default.createElement("input", {
          className: "fex-palette-input",
          type: "text",
          value: palette.q,
          placeholder: "\u5FEB\u901F\u6253\u5F00\u6587\u4EF6\u2026 (Ctrl+P)",
          autoFocus: true,
          spellCheck: false,
          onChange: (e) => setPalette({ ...palette, q: e.target.value, idx: 0 }),
          onKeyDown: (e) => {
            if (e.key === "Escape") {
              setPalette(null);
              return;
            }
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              if (palette.results.length) {
                setPalette({ ...palette, idx: (palette.idx + (e.key === "ArrowDown" ? 1 : -1) + palette.results.length) % palette.results.length });
              }
              return;
            }
            if (e.key === "Enter") {
              e.preventDefault();
              const r = palette.results[palette.idx];
              if (r) openFile(r.path, r.name, false);
              setPalette(null);
            }
          }
        }),
        import_react.default.createElement(
          "div",
          { className: "fex-palette-list" },
          palette.results.map((r, i) => import_react.default.createElement(
            "div",
            {
              key: r.path,
              className: "fex-palette-item" + (i === palette.idx ? " active" : ""),
              onClick: () => {
                openFile(r.path, r.name, false);
                setPalette(null);
              },
              onMouseMove: () => setPalette({ ...palette, idx: i })
            },
            import_react.default.createElement("span", { className: "fex-ico" }, fileIcon(r.name, false, false)),
            import_react.default.createElement("span", { className: "fex-palette-name" }, r.name),
            import_react.default.createElement("span", { className: "fex-palette-path" }, r.path)
          )),
          !palette.q ? import_react.default.createElement("div", { className: "fex-palette-hint" }, "\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22\u6587\u4EF6\u540D") : null,
          palette.q && !palette.results.length ? import_react.default.createElement("div", { className: "fex-palette-hint" }, "\u65E0\u5339\u914D") : null
        )
      ) : null;
      const menuEl = menu ? import_react.default.createElement(
        import_react.default.Fragment,
        null,
        import_react.default.createElement("div", { className: "fex-menu-mask", onClick: () => setMenu(null), onContextMenu: (e) => {
          e.preventDefault();
          setMenu(null);
        } }),
        import_react.default.createElement(
          "div",
          {
            className: "fex-menu",
            style: {
              left: Math.min(menu.x, (typeof window !== "undefined" ? window.innerWidth : 1400) - 170),
              top: Math.min(menu.y, (typeof window !== "undefined" ? window.innerHeight : 900) - 140)
            }
          },
          menuItem("\u590D\u5236\u8DEF\u5F84", "copy", () => {
            try {
              const p = navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(menu.path);
              if (p && p.catch) p.catch(() => {
              });
            } catch (err) {
            }
          }),
          menuItem("\u5728\u7CFB\u7EDF\u6253\u5F00", "external", () => {
            if (workspaces) workspaces.openPath(menu.path);
          }),
          menuItem("\u6253\u5F00\u6240\u5728\u6587\u4EF6\u5939", "folderOpen2", () => {
            if (workspaces) workspaces.openPath(parentOf(menu.path));
          }),
          !menu.isDir ? menuItem("\u5728\u65B0\u6807\u7B7E\u6253\u5F00", "file", () => openFile(menu.path, menu.name, false)) : null
        )
      ) : null;
      const noticeEl = notice ? import_react.default.createElement("div", {
        className: "fex-notice" + (notice.kind === "error" ? " err" : ""),
        role: "status",
        "aria-live": "polite"
      }, notice.text) : null;
      return import_react.default.createElement("div", { className: "fex-panel" }, headEl, bodyEl, paletteEl, menuEl, noticeEl);
    })
  ));
}
return module.exports; } });
//# sourceMappingURL=client.js.map
