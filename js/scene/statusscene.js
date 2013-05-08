/**
 * ゲーム画面
 */
(function(ns) {

    ns.StatusScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(player, width, height) {
            this.superInit();
            this.player = player;

            // 画面にかける色
            var filter = tm.app.Shape(width, height);
            filter.setPosition(width/2, height/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(filter);

            // ステータス終了ボタン
            var endButton = tm.app.GlossyButton(150, 60, "blue", "終了");
            endButton.position.set(width-150, 80);
            this.endButton = endButton;
            endButton.addEventListener("pointingend", function(e) {
                e.app.popScene();
            });

            // 画面に追加
            this.addChild(endButton);
        },

        update : function() {
        }
    });

})(game);