'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
  function Cache(props) {
    _classCallCheck(this, Cache);

    this._images = {};
    this._timestamp = Date.now();
    this._loadContext();
  }

  _createClass(Cache, [{
    key: '_loadContext',
    value: function _loadContext() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }

      // TODO: fix this for the desktop
      // if (!require.context) {
      //   this._imagesContext = (name) => ({ placeholder: `../../assets/${name}`, images: [{ path: `../../assets/${name}` }, { path: `../../assets/${name}` }] })
      //   return
      // }

      this._imagesContext = require.context('assets', false, /\.(png|jpe?g|svg)$/);
    }
  }, {
    key: 'hasImage',
    value: function hasImage(name) {
      return this.images[name] !== undefined;
    }
  }, {
    key: 'cacheImage',
    value: function cacheImage(id) {
      var name = './' + id;
      var timestamp = Date.now();
      var data = this._imagesContext(name, true);
      var placeholder = data.placeholder;
      var small = data.images[0].path;
      var large = data.images[1].path;
      this._images[id] = { data: data, id: id, timestamp: timestamp, small: small, large: large, placeholder: placeholder };
    }
  }, {
    key: 'image',
    value: function image(name) {
      if (!this.hasImage(name)) {
        this.cacheImage(name);
      }

      return this.images[name];
    }
  }, {
    key: 'images',
    get: function get() {
      return this._images;
    }
  }]);

  return Cache;
}();

exports.default = Cache;