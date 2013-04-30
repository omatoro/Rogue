/**
 * Map
 */
(function(ns) {

    // コマ送りアニメーションの基本的な書式を利用
    var IMAGE_WIDTH  = 16;
    var IMAGE_HEIGHT = 80;
    var IMAGE_DIVIDE_COLUMN = 1;
    var IMAGE_DIVIDE_ROW    = 5;
    var CHIP_WIDTH     = IMAGE_WIDTH;
    var CHIP_HEIGHT    = IMAGE_HEIGHT/IMAGE_DIVIDE_ROW;

	ns.Map = tm.createClass({
		superClass : ns.MapSprite,

		init: function (pad) {
			var mapchip = ns.MapChip({
                image: "Grass1_pipo",
                chips: {
                	0: {width: CHIP_WIDTH, height: CHIP_HEIGHT, image: "Dirt1_pipo",  count: 5},
                	1: {width: CHIP_WIDTH, height: CHIP_HEIGHT, image: "Grass1_pipo", count: 5},
                	2: {width: CHIP_WIDTH, height: CHIP_HEIGHT, image: "Grass1_pipo", count: 5},
                },
                map: [
					[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
					[  0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0,  0],
					[  0,  2,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[  0,  2,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[  0,  2,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
					[  0,  2,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
				]
            });

            this.superInit(mapchip, 64, 64);

            // キャラではなくマップが移動する 向いている方向を保持
            this.velocity = tm.geom.Vector2(0, 0);

            // padがあれば追加する
            this.pad = pad || false;

            // 移動スピード
            this.speed = 0;
		},

		update: function (app) {
            var angle = app.keyboard.getKeyAngle();
            if (angle !== null) {
                this.velocity.setDegree(angle, 1);
                this.velocity.x *= -1;
                // this.velocity.y *= -1;
                this.speed = 6;
            }
            // タッチパネルによる速度設定
            else if (this.pad && this.pad.isTouching) {
                if   (this.pad.angle < 0) {this.pad.angle *= -1;}
                else                      {this.pad.angle = 360 - this.pad.angle;}
                this.velocity.setDegree(this.pad.angle, 1);
                this.velocity.x *= -1;
                this.velocity.y *= -1;
                this.speed = 6;
            }

            // マップ移動
            this.position.add( tm.geom.Vector2.mul(this.velocity, this.speed) );
            this.speed = 0;
		}

	});

})(game);