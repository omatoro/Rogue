/**
 * マップ自動生成
 */
(function(ns) {

    var MAP_WIDTH  = 50; // 配列数なので注意
    var MAP_HEIGHT = 40;


    var ROOM_SIZE_MIN = 4;
    var MARGIN_BETWEEN_RECT_ROOM = 2;
    var RECT_NUM_MIN = ROOM_SIZE_MIN + (MARGIN_BETWEEN_RECT_ROOM * 2); // 区画の最小構成数

    var COUPLE_VERTICAL = 0;
    var COUPLE_HORIZONAL = 1;

    ns.GenerateMap = tm.createClass({

        init: function () {
            // 生成する配列の初期化
            var map = [];
            for (var i = 0; i < MAP_HEIGHT; ++i) {
                map[i] = [];
                for (var j = 0; j < MAP_WIDTH; ++j) {
                    map[i].push(false);
                }
            }
            this.map = map;

            // 区画を管理
            this.rectList = [];

            // 区画内の部屋を管理
            this.roomList = [];

            // つなげる部屋を管理
            this.coupleList = [];

            // 分割を開始
            this.divideRect(this.addRect(0, 0, MAP_WIDTH - 1, MAP_HEIGHT - 1));

            // 部屋を作成
            this.makeRoom();




            // test console
            for (var i = 0; i < this.rectList.length; ++i) {
                break;
                var rect = this.rectList[i];
                var k, l;
                for (k = rect.lx, l = rect.ly; k <= rect.hx; ++k) {this.map[l][k] = true;}
                for (k = rect.lx, l = rect.hy; k <= rect.hx; ++k) {this.map[l][k] = true;}
                for (k = rect.lx, l = rect.ly; l <= rect.hy; l++) {this.map[l][k] = true;}
                for (k = rect.hx, l = rect.ly; l <= rect.hy; l++) {this.map[l][k] = true;}
            }
            for (var i = 0; i < this.roomList.length; ++i) {
                var room = this.roomList[i];
                for (var j = room.lx; j <= room.hx; ++j) {
                    for (var k = room.ly; k <= room.hy; ++k) {
                        map[k][j] = true;
                    };
                };
            };
            for (var i = 0; i < this.coupleList.length; ++i) {
                var couple = this.coupleList[i];
                switch (couple.v_or_h) {
                    case COUPLE_HORIZONAL:
                        var c0x = couple.rect0.hx;
                        var c0y = Math.rand(couple.rect0.room.ly + 1, couple.rect0.room.hy -1);
                        var c1x = couple.rect1.lx;
                        var c1y = Math.rand(couple.rect1.room.ly + 1, couple.rect1.room.hy -1);
                        this._line(c0x, c0y, c1x, c1y);
                        this._line(couple.rect0.room.hx, c0y, c0x, c0y);
                        this._line(couple.rect1.room.lx, c1y, c1x, c1y);
                        break;

                    case COUPLE_VERTICAL:
                        var c0x = Math.rand(couple.rect0.room.lx + 1, couple.rect0.room.hx -1);
                        var c0y = couple.rect0.hy;
                        var c1x = Math.rand(couple.rect1.room.lx + 1, couple.rect1.room.hx -1);
                        var c1y = couple.rect1.ly;
                        this._line(c0x, c0y, c1x, c1y);
                        this._line(c0x, couple.rect0.room.hy, c0x, c0y);
                        this._line(c1x, couple.rect1.room.ly, c1x, c1y);
                        break;
                }
            };
            var line = "";
            for (var i = 0; i < this.map.length; ++i) {
                for (var j = 0; j < this.map[i].length; ++j) {
                    if (map[i][j]) {
                        line += "#";
                    }
                    else {
                        line += ".";
                    }
                }
                console.log(line);
                line = "";
            }

            // マップ情報をfalseなら1, trueなら2に変更 ついでに歩ける場所の数も数えとく
            var possibleWalkMapNum = 0;
            // またまたついでにコリジョン用のデータをサクッと作る(歩ける:1, 壁:0)
            var collision = [];
            for (var i = 0; i < this.map.length; ++i) {
                collision[i] = [];
                for (var j = 0; j < this.map[i].length; ++j) {
                    if (map[i][j]) {
                        map[i][j] = 2;
                        collision[i].push(1);
                        ++possibleWalkMapNum;
                    }
                    else {
                        map[i][j] = 1;
                        collision[i].push(0);
                    }
                }
            }

            this.collision = collision;
            this.walkMapNum = possibleWalkMapNum; // 歩ける場所の数
            console.dir(collision);
        },

        _line: function (x0, y0, x1, y1) {
            var min_x = (x0 < x1) ? x0 : x1;
            var max_x = (x0 > x1) ? x0 : x1;
            var min_y = (y0 < y1) ? y0 : y1;
            var max_y = (y0 > y1) ? y0 : y1;

            if ((x0 <= x1) && (y0 >= y1)) {
                for (var i = min_x; i <= max_x; ++i) {this.map[min_y][i] = true;}
                for (var j = min_y; j <= max_y; ++j) {this.map[j][max_x] = true;}
                return ;
            }
            if ((x0 > x1) && (y0 > y1)) {
                for (var i = min_x; i <= max_x; ++i) {this.map[min_y][i] = true;}
                for (var j = min_y; j <= max_y; ++j) {this.map[j][max_x] = true;}
                return ;
            }
            if ((x0 > x1) && (y0 <= y1)) {
                for (var i = min_x; i <= max_x; ++i) {this.map[min_y][i] = true;}
                for (var j = min_y; j <= max_y; ++j) {this.map[j][min_x] = true;}
                return ;
            }
            if ((x0 <= x1) && (y0 < y1)) {
                for (var i = min_x; i <= max_x; ++i) {this.map[max_y][i] = true;}
                for (var j = min_y; j <= max_y; ++j) {this.map[j][min_x] = true;}
                return ;
            }
        },


        // 区画を追加
        addRect: function (lx, ly, hx, hy) {
            var rect = {
                lx: lx, 
                ly: ly, 
                hx: hx, 
                hy: hy, 
                room: {}, 
                done_split_v: false,
                done_split_h: false
            };
            this.rectList.push(rect);
            return rect;
        },

        // 区画を分割する
        divideRect: function (parentRect) {
            // 再帰終了の条件
            if (parentRect.hy - parentRect.ly <= RECT_NUM_MIN * 2) {
                parentRect.done_split_v = true;
            }
            if (parentRect.hx - parentRect.lx <= RECT_NUM_MIN * 2) {
                parentRect.done_split_h = true;
            }
            if ((parentRect.done_split_v) &&
                (parentRect.done_split_h)) {
                return ;
            }

            // 再帰用child
            var childRect = this.addRect(parentRect.lx, parentRect.ly, parentRect.hx, parentRect.hy);

            // 縦に分割すべきか判断
            var rand = Math.rand(0, 1);
            if (!parentRect.done_split_v) {
                var divideY = Math.rand(parentRect.ly + RECT_NUM_MIN, parentRect.hy - RECT_NUM_MIN -1);
                parentRect.hy = divideY;
                childRect.ly = divideY;
                parentRect.done_split_v = true;
                childRect.done_split_v = true;
                this.addCouple(COUPLE_VERTICAL, parentRect, childRect);
                this.divideRect(parentRect);
                this.divideRect(childRect);
                return ;
            }
            // 横に分割すべきか判断
            if (!parentRect.done_split_h) {
                var divideX = Math.rand(parentRect.lx + RECT_NUM_MIN, parentRect.hx - RECT_NUM_MIN -1);
                parentRect.hx = divideX;
                childRect.lx = divideX;
                parentRect.done_split_h = true;
                childRect.done_split_h = true;
                this.addCouple(COUPLE_HORIZONAL, parentRect, childRect);
                this.divideRect(parentRect);
                this.divideRect(childRect);
                return ;
            }
        },

        // 部屋を追加
        addRoom: function (lx, ly, hx, hy) {
            var room = {
                lx: lx, ly: ly, hx: hx, hy: hy, room: {}
            };
            this.roomList.push(room);
            return room;
        },

        // 部屋を作成
        makeRoom: function () {
            var x, y, w, h;

            for (var i = 0; i < this.rectList.length; ++i) {
                var rect = this.rectList[i];
                w = Math.rand(ROOM_SIZE_MIN,                      rect.hx - rect.lx - (MARGIN_BETWEEN_RECT_ROOM * 2));
                h = Math.rand(ROOM_SIZE_MIN,                      rect.hy - rect.ly - (MARGIN_BETWEEN_RECT_ROOM * 2));
                x = Math.rand(rect.lx + MARGIN_BETWEEN_RECT_ROOM, rect.hx - MARGIN_BETWEEN_RECT_ROOM - w);
                y = Math.rand(rect.ly + MARGIN_BETWEEN_RECT_ROOM, rect.hy - MARGIN_BETWEEN_RECT_ROOM - h);

                rect.room = this.addRoom(x, y, x + w, y + h);
            }
        },

        // 部屋をつなげる
        addCouple: function (v_or_h, rect0, rect1) {
            var couple = {
                v_or_h: v_or_h, rect0: rect0, rect1: rect1
            };
            this.coupleList.push(couple);
            return couple;
        },

        update: function () {
        }
    });

})(game);