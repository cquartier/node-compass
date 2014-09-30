/// <reference path="references/tsd.d.ts" />

import Middleware = require('./middleware');
import Options    = require('./options');
import express    = require('express');
import Compiler   = require('./compiler');
import Logger     = require('./logger');

/**
 * Factory for a Middleware that will compiling compass projects
 */
export function HandlerFactory(overrides : Object = {}, logger ?: Logger.Logger) : express.Handler {

    /**
     * Extended options with our overrides
     */
    var options = Options.ExtendOptions(overrides);

    if (!logger) {
        var winston = require('winston');

        /**
         * Create an instance of winston that uses the Console transport
         */
        logger = new (winston.Logger)({
            transports : [
                new winston.transports.Console()
            ]
        });
    }

    var compiler = new Compiler.CompassCompiler(options, logger);

    return Middleware.MiddlewareFactory(options, compiler);
}