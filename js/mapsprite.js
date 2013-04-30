/**
 * MapSprite
 */
(function(ns) {

    ns.MapSprite = tm.createClass({

        superClass: tm.app.CanvasElement,

        /**
         * 初期化
         * ※width,heightで指定する大きさはmapchip一つの大きさ
         */
        init: function(mapchip, mapChipWidth, mapChipHeight)
        {
            this.superInit();
            
            this.width  = mapchip.map[0].length * (mapChipWidth  || 16);
            this.height = mapchip.map.length    * (mapChipHeight || 16);

            this.mapChipWidth  = mapChipWidth  || 16;
            this.mapChipHeight = mapChipHeight || 16;
            
            this.mapchip = mapchip; // マップチップの情報や画像情報が格納されてる
            this.currentFrame = 0;
            this.currentFrameIndex = 0;
        },

        /**
         * 描画
         */
        draw: function(canvas) {
        	for (var i = 0; i < this.mapchip.map.length; ++i) {
        		for (var j = 0; j < this.mapchip.map[i].length; ++j) {
        			var drawingMapChipID = this.mapchip.map[i][j];

        			var srcRect = this.mapchip.getFrame(drawingMapChipID, 0);//this.currentFrame);
        			var element = this.mapchip.images[drawingMapChipID].element;

        			var dx = -this.width*this.originX  + (j*this.mapchip.chips[drawingMapChipID].width);
        			var dy = -this.height*this.originY + (i*this.mapchip.chips[drawingMapChipID].height);

        			// http://www.html5.jp/canvas/ref/method/drawImage.html
		            canvas.drawImage(
		            	element,
		                srcRect.x,
		                srcRect.y,
		                srcRect.width,
		                srcRect.height,
		                dx,
		                dy,
		                this.mapChipWidth,
		                this.mapChipHeight);
        		}
        	}
        }
    });

})(game);