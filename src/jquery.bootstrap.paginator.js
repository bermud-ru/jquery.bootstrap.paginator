/**
 * @module jquery.bootstrap.paginator.js
 * jQuery плагин bootstrapPaginator
 * @author Андрей Новиков <andrey@novikov.be>
 * @data 14/10/2015
 */

(function ( $, window, undefined ) {
    'use strict';

    var pluginName = 'bootstrapPaginator',
        document = window.document,
        _default = {page: 1, count: 1, ruler:1,reload:false}
        ;

    var classBootstrapPaginator = function(container, settings)
    {
        this.container = $(container);
        this.settings = $.extend(_default, settings);
        this._name = pluginName;
        this.build();
        this.bind();
        return container;
    };

    classBootstrapPaginator.prototype = {
        build: function () {
            var data = [];
            if (this.settings.count && this.settings.page && this.settings.count >= this.settings.count) {
                var self = this,
                    ruler = (self.settings.ruler < self.settings.count ? self.settings.ruler : self.settings.count),
                    isArrow = ruler < self.settings.count,
                    paginator = [], count = ruler;
                if (isArrow) count += 2;
                var middle = Math.round(ruler / 2) + (ruler & 1 ? 0 : 1);
                for (var i = 0; i < count; i++) {
                    if (((self.settings.page + isArrow - middle) <= 0) && (middle - isArrow*2) < (self.settings.count - self.settings.page))
                        paginator.push(i);
                    else if ((self.settings.page - isArrow*2 + middle) > self.settings.count && (middle - isArrow*2) < (self.settings.count - self.settings.page))
                        paginator.push(self.settings.page - count + i + isArrow * 2);
                    else if ((middle - isArrow*2) >= (self.settings.count - self.settings.page))
                        paginator.push(self.settings.count + isArrow * 2 - count + i);
                    else paginator.push(self.settings.page - middle + i);
                }
                if (ruler) {
                    paginator.map(function (item, index, a) {
                        if (isArrow && index == 0) {
                            data.push({content: '«', shift: -1, css: self.settings.page - 1 ? 'laquo' : 'disabled'}); return;
                        }
                        if (isArrow && index == (a.length - 1)) {
                            data.push({content: '»', shift: 1, css: self.settings.page + 1 < self.settings.count ? 'raquo' : 'disabled'}); return;
                        }
                        data.push({content: item, page: item, css: (item == self.settings.page ? 'active' : '')});
                    });
                }
            }
            this.render(data);
        },
        render: function(data){
            var self = this;
            var ul = document.createElement('ul');
            ul.className = 'pagination';
            data.map(function(item) {
                var li = document.createElement('li');
                li.className = item.css;
                var a = document.createElement('a');
                a.appendChild(document.createTextNode(item.content));
                if (item.shift) {
                    var attr = document.createAttribute("data-page");
                    attr.value = self.settings.page + item.shift;
                    a.setAttributeNode(attr);
                } else if(item.page) {
                    var attr = document.createAttribute("data-page");
                    attr.value = item.page;
                    a.setAttributeNode(attr);
                }
                li.appendChild(a);
                ul.appendChild(li);
            });
            this.container.html(ul);
        },
        bind: function() {
            var self = this;
            self.container.on('click', 'li:not(.active, .disabled) a', function (e) {
                var page = $(this).data('page');
                if  (typeof  self.settings.reload === 'function') self.settings.reload.call(this, page);
                window.dispatchEvent(new CustomEvent('paginator.change', {detail:page}));
            });
            window.addEventListener('paginator.change', this.onPagination.bind(this), false);
        },
        onPagination:function(e){
            var page = e.detail,self = this;
            self.container.fadeOut(function (e) {
                self.settings.page = page; self.build();
                self.container.fadeIn();
            })
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new classBootstrapPaginator( this, options ));
            }
        });
    }
}(jQuery, window));