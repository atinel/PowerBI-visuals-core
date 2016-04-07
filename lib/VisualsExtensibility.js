/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
///<reference path="../../Typedefs/jquery/jquery.d.ts"/>
///<reference path="../../Typedefs/globalize/globalize.d.ts"/>
///<reference path="../../Typedefs/lodash/lodash.d.ts"/>
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var telemetry;
        (function (telemetry) {
            /**
             * Creates a client-side Guid string.
             * @returns A string representation of a Guid.
             */
            function generateGuid() {
                var guid = "", idx = 0;
                for (idx = 0; idx < 32; idx += 1) {
                    var guidDigitsItem = Math.random() * 16 | 0;
                    switch (idx) {
                        case 8:
                        case 12:
                        case 16:
                        case 20:
                            guid += "-";
                            break;
                    }
                    guid += guidDigitsItem.toString(16);
                }
                return guid;
            }
            telemetry.generateGuid = generateGuid;
        })(telemetry = visuals.telemetry || (visuals.telemetry = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var telemetry;
        (function (telemetry) {
            telemetry.ExtensibilityVisualApiUsage = function (name, apiVersion, custom, parentId, isError, errorSource, errorCode) {
                if (isError === void 0) { isError = false; }
                if (errorSource === void 0) { errorSource = undefined; }
                if (errorCode === void 0) { errorCode = undefined; }
                var info = {
                    name: name,
                    apiVersion: apiVersion,
                    custom: custom,
                    parentId: parentId,
                    isError: isError,
                    errorSource: errorSource,
                    errorCode: errorCode,
                };
                var event = {
                    name: 'PBI.Extensibility.VisualApiUsage',
                    category: 1 /* CustomerAction */,
                    time: Date.now(),
                    id: telemetry.generateGuid(),
                    getFormattedInfoObject: function () {
                        var formattedObject = {
                            name: info.name,
                            apiVersion: info.apiVersion,
                            custom: info.custom,
                            parentId: info.parentId,
                            isError: info.isError,
                        };
                        if (typeof info.errorSource !== 'undefined') {
                            formattedObject['errorSource'] = telemetry.ErrorSource[info.errorSource];
                        }
                        if (typeof info.errorCode !== 'undefined') {
                            formattedObject['errorCode'] = info.errorCode;
                        }
                        return formattedObject;
                    },
                    info: info,
                    privateFields: [],
                    orgInfoFields: []
                };
                if (typeof telemetry.ExtensibilityVisualApiUsageLoggers !== 'undefined') {
                    event.loggers = telemetry.ExtensibilityVisualApiUsageLoggers;
                }
                return event;
            };
            telemetry.VisualException = function (visualType, isCustom, apiVersion, source, lineNumber, columnNumber, stack, message) {
                var info = {
                    visualType: visualType,
                    isCustom: isCustom,
                    apiVersion: apiVersion,
                    source: source,
                    lineNumber: lineNumber,
                    columnNumber: columnNumber,
                    stack: stack,
                    message: message,
                };
                var event = {
                    name: 'PBI.VisualException',
                    category: 2 /* CriticalError */,
                    time: Date.now(),
                    id: telemetry.generateGuid(),
                    getFormattedInfoObject: function () {
                        var formattedObject = {
                            visualType: info.visualType,
                            isCustom: info.isCustom,
                            apiVersion: info.apiVersion,
                            source: info.source,
                            lineNumber: info.lineNumber,
                            columnNumber: info.columnNumber,
                            stack: info.stack,
                            message: info.message,
                        };
                        return formattedObject;
                    },
                    info: info,
                    privateFields: [],
                    orgInfoFields: []
                };
                if (typeof telemetry.VisualExceptionLoggers !== 'undefined') {
                    event.loggers = telemetry.VisualExceptionLoggers;
                }
                return event;
            };
        })(telemetry = visuals.telemetry || (visuals.telemetry = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
/*
*  Power BI Visualizations
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        ;
        var SelectionManager = (function () {
            function SelectionManager(options) {
                this.hostServices = options.hostServices;
                this.selectedIds = [];
                this.promiseFactory = this.hostServices.promiseFactory();
            }
            SelectionManager.prototype.select = function (selectionId, multiSelect) {
                if (multiSelect === void 0) { multiSelect = false; }
                var defered = this.promiseFactory.defer();
                if (this.hostServices.shouldRetainSelection()) {
                    this.sendSelectionToHost([selectionId]);
                }
                else {
                    this.selectInternal(selectionId, multiSelect);
                    this.sendSelectionToHost(this.selectedIds);
                }
                defered.resolve(this.selectedIds);
                return defered.promise;
            };
            SelectionManager.prototype.hasSelection = function () {
                return this.selectedIds.length > 0;
            };
            SelectionManager.prototype.clear = function () {
                var defered = this.promiseFactory.defer();
                this.selectedIds = [];
                this.sendSelectionToHost([]);
                defered.resolve(null);
                return defered.promise;
            };
            SelectionManager.prototype.getSelectionIds = function () {
                return this.selectedIds;
            };
            SelectionManager.prototype.sendSelectionToHost = function (ids) {
                var selectArgs = {
                    data: ids
                        .filter(function (value) { return value.hasIdentity(); })
                        .map(function (value) { return value.getSelector(); })
                };
                var data2 = ids
                    .filter(function (value) { return value.getSelectorsByColumn() && value.hasIdentity(); })
                    .map(function (value) { return value.getSelectorsByColumn(); });
                if (data2 && data2.length > 0)
                    selectArgs.data2 = data2;
                this.hostServices.onSelect(selectArgs);
            };
            SelectionManager.prototype.selectInternal = function (selectionId, multiSelect) {
                if (SelectionManager.containsSelection(this.selectedIds, selectionId)) {
                    this.selectedIds = multiSelect
                        ? this.selectedIds.filter(function (d) { return !selectionId.equals(d); })
                        : this.selectedIds.length > 1
                            ? [selectionId] : [];
                }
                else {
                    if (multiSelect)
                        this.selectedIds.push(selectionId);
                    else
                        this.selectedIds = [selectionId];
                }
            };
            SelectionManager.containsSelection = function (list, id) {
                return list.some(function (d) { return id.equals(d); });
            };
            return SelectionManager;
        }());
        extensibility.SelectionManager = SelectionManager;
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        /**
         * This class is designed to simplify the creation of SelectionId objects
         * It allows chaining to build up an object before calling 'create' to build a SelectionId
         */
        var SelectionIdBuilder = (function () {
            function SelectionIdBuilder() {
            }
            SelectionIdBuilder.prototype.withCategory = function (categoryColumn, index) {
                if (categoryColumn && categoryColumn.source && categoryColumn.source.queryName && categoryColumn.identity)
                    this.ensureDataMap()[categoryColumn.source.queryName] = categoryColumn.identity[index];
                return this;
            };
            SelectionIdBuilder.prototype.withSeries = function (seriesColumn, valueColumn) {
                if (seriesColumn && seriesColumn.source && seriesColumn.source.queryName && valueColumn)
                    this.ensureDataMap()[seriesColumn.source.queryName] = valueColumn.identity;
                return this;
            };
            SelectionIdBuilder.prototype.withMeasure = function (measureId) {
                this.measure = measureId;
                return this;
            };
            SelectionIdBuilder.prototype.createSelectionId = function () {
                return powerbi.visuals.SelectionId.createWithSelectorForColumnAndMeasure(this.ensureDataMap(), this.measure);
            };
            SelectionIdBuilder.prototype.ensureDataMap = function () {
                if (!this.dataMap)
                    this.dataMap = {};
                return this.dataMap;
            };
            return SelectionIdBuilder;
        }());
        extensibility.SelectionIdBuilder = SelectionIdBuilder;
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var ExtensibilityVisualApiUsage = powerbi.visuals.telemetry.ExtensibilityVisualApiUsage;
        //TODO: refactor this into a service
        extensibility.visualApiVersions = [];
        function createVisualAdapter(visualPlugin, telemetryService) {
            var visualTelemetryInfo = {
                name: visualPlugin.name,
                apiVersion: visualPlugin.apiVersion,
                custom: !!visualPlugin.custom
            };
            return new extensibility.VisualSafeExecutionWrapper(new VisualAdapter(visualPlugin, telemetryService), visualTelemetryInfo, telemetryService);
        }
        extensibility.createVisualAdapter = createVisualAdapter;
        var VisualAdapter = (function () {
            function VisualAdapter(visualPlugin, telemetryService) {
                this.telemetryService = telemetryService;
                this.plugin = visualPlugin;
                var version = visualPlugin.apiVersion;
                var versionIndex = this.getVersionIndex(version);
                var isError = false;
                if (!version) {
                    this.legacy = true;
                }
                else if (versionIndex > -1) {
                    this.apiVersionIndex = versionIndex;
                    this.legacy = false;
                }
                else {
                    debug.assertFail("The API version '" + version + "' is invalid.");
                    isError = true;
                }
                if (this.telemetryService) {
                    this.telemetryService.logEvent(ExtensibilityVisualApiUsage, this.plugin.name, this.plugin.apiVersion, !!this.plugin.custom, undefined, isError, powerbi.visuals.telemetry.ErrorSource.User);
                }
            }
            VisualAdapter.prototype.init = function (options) {
                options.element.empty();
                if (this.legacy) {
                    this.visual = this.plugin.create();
                    this.visualLegacy.init(options);
                }
                else {
                    var host = extensibility.visualApiVersions[this.apiVersionIndex].hostAdapter(options.host);
                    this.visual = this.plugin.create({
                        element: options.element.get(0),
                        host: host
                    });
                    this.overloadMethods();
                }
            };
            VisualAdapter.prototype.update = function (options) {
                if (options.type & powerbi.VisualUpdateType.Resize && this.visualHasMethod('onResizing')) {
                    this.onResizing(options.viewport);
                }
                else if (this.visualHasMethod('update')) {
                    this.visualLegacy.update(options);
                }
                else {
                    if (!options.type || options.type & powerbi.VisualUpdateType.Data) {
                        this.onDataChanged(_.pick(options, ['dataViews', 'operationKind']));
                    }
                    if (options.type & powerbi.VisualUpdateType.ViewMode) {
                        this.onViewModeChanged(options.viewMode);
                    }
                }
            };
            VisualAdapter.prototype.destroy = function () {
                if (this.visualHasMethod('destroy')) {
                    this.visualLegacy.destroy();
                }
            };
            VisualAdapter.prototype.enumerateObjectInstances = function (options) {
                if (!this.visualHasMethod('enumerateObjectInstances')) {
                    return;
                }
                return this.visualLegacy.enumerateObjectInstances(options);
            };
            VisualAdapter.prototype.onResizing = function (finalViewport) {
                if (this.visualHasMethod('onResizing')) {
                    this.visualLegacy.onResizing(finalViewport);
                }
            };
            VisualAdapter.prototype.onDataChanged = function (options) {
                if (this.visualHasMethod('onDataChanged')) {
                    this.visualLegacy.onDataChanged(options);
                }
            };
            VisualAdapter.prototype.onViewModeChanged = function (viewMode) {
                if (this.visualHasMethod('onViewModeChanged')) {
                    this.visualLegacy.onViewModeChanged(viewMode);
                }
            };
            VisualAdapter.prototype.onClearSelection = function () {
                if (this.visualHasMethod('onClearSelection')) {
                    this.visualLegacy.onClearSelection();
                }
            };
            VisualAdapter.prototype.canResizeTo = function (viewport) {
                if (this.visualHasMethod('canResizeTo')) {
                    return this.visualLegacy.canResizeTo(viewport);
                }
            };
            VisualAdapter.prototype.unwrap = function () {
                return this.visual;
            };
            Object.defineProperty(VisualAdapter.prototype, "visualNew", {
                get: function () {
                    if (this.legacy)
                        return;
                    return this.visual;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VisualAdapter.prototype, "visualLegacy", {
                get: function () {
                    if (!this.legacy)
                        return;
                    return this.visual;
                },
                enumerable: true,
                configurable: true
            });
            VisualAdapter.prototype.visualHasMethod = function (methodName) {
                var visual = this.legacy ? this.visualLegacy : this.visualNew;
                return visual && _.isFunction(visual[methodName]);
            };
            VisualAdapter.prototype.getVersionIndex = function (version) {
                if (version) {
                    var versionCount = extensibility.visualApiVersions.length;
                    for (var i = 0; i < versionCount; i++) {
                        if (extensibility.visualApiVersions[i].version === version) {
                            return i;
                        }
                    }
                }
                return -1;
            };
            VisualAdapter.prototype.overloadMethods = function () {
                var overloads = this.getCompiledOverloads();
                for (var key in overloads) {
                    this[key] = overloads[key];
                }
            };
            VisualAdapter.prototype.getCompiledOverloads = function () {
                var overloads = {};
                var versionIndex = this.apiVersionIndex;
                var visualNew = this.visualNew;
                for (var i = 0; i <= versionIndex; i++) {
                    var overloadFactory = extensibility.visualApiVersions[i].overloads;
                    if (_.isFunction(overloadFactory)) {
                        _.assign(overloads, overloadFactory(visualNew));
                    }
                }
                return overloads;
            };
            return VisualAdapter;
        }());
        extensibility.VisualAdapter = VisualAdapter;
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var VisualException = powerbi.visuals.telemetry.VisualException;
        var VisualSafeExecutionWrapper = (function () {
            function VisualSafeExecutionWrapper(wrappedVisual, visualInfo, telemetryService, silent) {
                this.wrappedVisual = wrappedVisual;
                this.visualInfo = visualInfo;
                this.telemetryService = telemetryService;
                this.silent = silent;
            }
            VisualSafeExecutionWrapper.prototype.init = function (options) {
                var _this = this;
                if (this.wrappedVisual.init) {
                    this.executeSafely(function () { return _this.wrappedVisual.init(options); });
                }
            };
            VisualSafeExecutionWrapper.prototype.destroy = function () {
                var _this = this;
                if (this.wrappedVisual.destroy)
                    this.executeSafely(function () { return _this.wrappedVisual.destroy(); });
            };
            VisualSafeExecutionWrapper.prototype.update = function (options) {
                var _this = this;
                if (this.wrappedVisual.update)
                    this.executeSafely(function () { return _this.wrappedVisual.update(options); });
            };
            VisualSafeExecutionWrapper.prototype.onResizing = function (finalViewport) {
                var _this = this;
                if (this.wrappedVisual.onResizing)
                    this.executeSafely(function () { return _this.wrappedVisual.onResizing(finalViewport); });
            };
            VisualSafeExecutionWrapper.prototype.onDataChanged = function (options) {
                var _this = this;
                if (this.wrappedVisual.onDataChanged)
                    this.executeSafely(function () { return _this.wrappedVisual.onDataChanged(options); });
            };
            VisualSafeExecutionWrapper.prototype.onViewModeChanged = function (viewMode) {
                var _this = this;
                if (this.wrappedVisual.onViewModeChanged)
                    this.executeSafely(function () { return _this.wrappedVisual.onViewModeChanged(viewMode); });
            };
            VisualSafeExecutionWrapper.prototype.onClearSelection = function () {
                var _this = this;
                if (this.wrappedVisual.onClearSelection)
                    this.executeSafely(function () { return _this.wrappedVisual.onClearSelection(); });
            };
            VisualSafeExecutionWrapper.prototype.canResizeTo = function (viewport) {
                var _this = this;
                if (this.wrappedVisual.canResizeTo)
                    return this.executeSafely(function () { return _this.wrappedVisual.canResizeTo(viewport); });
            };
            VisualSafeExecutionWrapper.prototype.enumerateObjectInstances = function (options) {
                var _this = this;
                if (this.wrappedVisual.enumerateObjectInstances)
                    return this.executeSafely(function () { return _this.wrappedVisual.enumerateObjectInstances(options); });
            };
            VisualSafeExecutionWrapper.prototype.unwrap = function () {
                var visual = this.wrappedVisual;
                return visual.unwrap ? visual.unwrap() : visual;
            };
            VisualSafeExecutionWrapper.prototype.executeSafely = function (callback) {
                try {
                    return callback();
                }
                catch (exception) {
                    if (!this.silent) {
                        console.error("Visual exception", exception.stack || exception);
                    }
                    if (this.telemetryService) {
                        this.telemetryService.logEvent(VisualException, this.visualInfo.name, this.visualInfo.custom, this.visualInfo.apiVersion, exception.fileName, exception.lineNumber, exception.columnNumber, exception.stack, exception.message);
                    }
                }
            };
            return VisualSafeExecutionWrapper;
        }());
        extensibility.VisualSafeExecutionWrapper = VisualSafeExecutionWrapper;
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var v100;
        (function (v100) {
            var overloadFactory = function (visual) {
                return {
                    update: function (options) {
                        if (visual.update) {
                            visual.update({
                                viewport: options.viewport,
                                dataViews: options.dataViews,
                                type: options.type || powerbi.VisualUpdateType.Data
                            });
                        }
                    },
                    destroy: function () {
                        if (visual.destroy) {
                            visual.destroy();
                        }
                    },
                    enumerateObjectInstances: function (options) {
                        if (visual.enumerateObjectInstances) {
                            return visual.enumerateObjectInstances(options);
                        }
                    }
                };
            };
            var hostAdapter = function (host) {
                return {};
            };
            extensibility.visualApiVersions.push({
                version: '1.0.0',
                overloads: overloadFactory,
                hostAdapter: hostAdapter
            });
        })(v100 = extensibility.v100 || (extensibility.v100 = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var v110;
        (function (v110) {
            var hostAdapter = function (host) {
                return {
                    createSelectionIdBuilder: function () { return new powerbi.visuals.SelectionIdBuilder(); },
                    createSelectionManager: function () { return new extensibility.SelectionManager({ hostServices: host }); }
                };
            };
            extensibility.visualApiVersions.push({
                version: '1.1.0',
                hostAdapter: hostAdapter
            });
        })(v110 = extensibility.v110 || (extensibility.v110 = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));

//# sourceMappingURL=VisualsExtensibility.js.map