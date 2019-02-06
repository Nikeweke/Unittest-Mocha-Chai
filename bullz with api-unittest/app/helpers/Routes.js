
/*
* main code from express-list-endpoints
*
*/

// var debug = require('debug')('express-list-endpoints')
const colors = require('colors')

/**
 * Print in console all the verbs detected for the passed route
 */
var getRouteMethods = function (route) {
    var methods = []

    for (var method in route.methods) {
        if (method === '_all') continue

        methods.push(method.toUpperCase())
    }

    return methods
}

/**
 * Return true if found regexp related with express params
 */
var hasParams = function (value) {
    var regExp = /\(\?:\(\[\^\\\/]\+\?\)\)/g
    return regExp.test(value)
}

/**
 * Return an array of strings with all the detected endpoints
 */
var getEndpoints = function (app, path, endpoints) {
    var regExp = /^\/\^\\\/(?:(:?[\w\\.-]*(?:\\\/:?[\w\\.-]*)*)|(\(\?:\(\[\^\\\/]\+\?\)\)))\\\/.*/
    var stack = app.stack || (app._router && app._router.stack)

    endpoints = endpoints || []
    path = path || ''

    stack.forEach(function (val) {
        if (val.route) {
            endpoints.push({
                path: path + (path && val.route.path === '/' ? '' : val.route.path),
                methods: getRouteMethods(val.route)
            })
        } else if (val.name === 'router' || val.name === 'bound dispatch') {
            var newPath = regExp.exec(val.regexp)

            if (newPath) {
                var parsedRegexp = val.regexp
                var keyIndex = 0
                var parsedPath

                while (hasParams(parsedRegexp)) {
                    parsedRegexp = parsedRegexp.toString().replace(/\(\?:\(\[\^\\\/]\+\?\)\)/, ':' + val.keys[keyIndex].name)
                    keyIndex++
                }

                if (parsedRegexp !== val.regexp) {
                    newPath = regExp.exec(parsedRegexp)
                }

                parsedPath = newPath[1].replace(/\\\//g, '/')

                if (parsedPath === ':postId/sub-router') console.log(val)

                getEndpoints(val.handle, path + '/' + parsedPath, endpoints)
            } else {
                getEndpoints(val.handle, path, endpoints)
            }
        }
    })

    return endpoints
}


/**
 * Formatting routes into lines and colors 
 * @param {Object} app Express app 
 * @author: Nikeweke
 */
function formatRoutes (app) {
  let routes = getEndpoints(app)
  let routesOutput = ''

  let methodsColors = {
      GET : 'green',
      POST: 'yellow',
      PUT: 'blue',
      DELETE: 'red',
      ALL: 'america'
  }

  for (let route of routes) {
    let method

    let methodLen = route.methods.length
    if (methodLen > 4 || methodLen === 0) {
      method = colors['america'](`{${'ALL'}}`)
    }

    else if (methodLen > 2 && methodLen < 4) {
     method = colors['america'](`{${'FEW'}}`)
    }

    else {
      let routeMethod  = route.methods[0]
      let routeColor   = methodsColors[routeMethod]
      method = colors.bold[routeColor](`{${routeMethod}}`)
    }

    // let method = route.methods[0]
    let path   = colors.yellow(`"${route.path}"`)
    routesOutput += `${method} - ${path} \n`
  }

  return routesOutput
}

module.exports = formatRoutes