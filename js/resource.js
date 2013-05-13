/**
 * リソースの読み込み
 */
tm.preload(function() {

	// tm.sound.SoundManager.add("bgm", "rsc/bgm.mp3", 1); // 音

	// プレイヤー
	tm.graphics.TextureManager.add("player", 		"rsc/player.png");
	tm.graphics.TextureManager.add("playerFace", 	"rsc/char.png");


	// モンスター
	tm.graphics.TextureManager.add("SlimeGreen",		"rsc/[Monster]Slime_Green.png");
	tm.graphics.TextureManager.add("SlimeBlue",			"rsc/[Monster]Slime_Blue.png");
	tm.graphics.TextureManager.add("SlimeRed",			"rsc/[Monster]Slime_Red.png");
	tm.graphics.TextureManager.add("SlimeGold",			"rsc/[Monster]Slime_Gold.png");

	tm.graphics.TextureManager.add("SmallBatBlack",		"rsc/[Monster]SmallBat_Black.png");
	tm.graphics.TextureManager.add("SmallBatGreen",		"rsc/[Monster]SmallBat_Green.png");
	tm.graphics.TextureManager.add("SmallBatRed",		"rsc/[Monster]SmallBat_Red.png");
	tm.graphics.TextureManager.add("SmallBatGhost",		"rsc/[Monster]SmallBat_Ghost.png");

	tm.graphics.TextureManager.add("GoblinGrey", 		"rsc/[Monster]Goblin_Grey.png");
	tm.graphics.TextureManager.add("GoblinGreen", 		"rsc/[Monster]Goblin_Green.png");
	tm.graphics.TextureManager.add("GoblinRed", 		"rsc/[Monster]Goblin_Red.png");

	tm.graphics.TextureManager.add("BatBlack",	 		"rsc/[Monster]Bat_Black.png");
	tm.graphics.TextureManager.add("BatGreen",	 		"rsc/[Monster]Bat_Green.png");
	tm.graphics.TextureManager.add("BatBlue",	 		"rsc/[Monster]Bat_Blue.png");
	tm.graphics.TextureManager.add("BatRed",	 		"rsc/[Monster]Bat_Red2.png");
	tm.graphics.TextureManager.add("BatWhite",	 		"rsc/[Monster]Bat_White.png");

	tm.graphics.TextureManager.add("SkeltonNormal", 	"rsc/[Monster]Skelton_Normal.png");
	tm.graphics.TextureManager.add("SkeltonGreen", 		"rsc/[Monster]Skelton_Green.png");
	tm.graphics.TextureManager.add("SkeltonBlue", 		"rsc/[Monster]Skelton_Blue.png");
	tm.graphics.TextureManager.add("SkeltonRed", 		"rsc/[Monster]Skelton_Red.png");

	tm.graphics.TextureManager.add("HarypyNormal",		"rsc/[Monster]Harypy_Normal.png");

	tm.graphics.TextureManager.add("LizardManNormal",	"rsc/[Monster]LizardMan_Normal.png");
	tm.graphics.TextureManager.add("LizardManBlue",		"rsc/[Monster]LizardMan_Blue.png");
	tm.graphics.TextureManager.add("LizardManRed",		"rsc/[Monster]LizardMan_Red.png");

	tm.graphics.TextureManager.add("ZombieNormal",		"rsc/[Monster]Zombie_Normal.png");
	tm.graphics.TextureManager.add("ZombieRed",			"rsc/[Monster]Zombie_Red.png");

	tm.graphics.TextureManager.add("GolemNormal",		"rsc/[Monster]Golem_Normal.png");
	tm.graphics.TextureManager.add("GolemGreen",		"rsc/[Monster]Golem_Green.png");
	tm.graphics.TextureManager.add("GolemBlue",			"rsc/[Monster]Golem_Blue.png");
	tm.graphics.TextureManager.add("GolemRed",			"rsc/[Monster]Golem_Red.png");
	tm.graphics.TextureManager.add("GolemGhost",		"rsc/[Monster]Golem_Ghost.png");

	tm.graphics.TextureManager.add("GhostNormal",		"rsc/[Monster]Ghost_Normal.png");

	tm.graphics.TextureManager.add("GargoyleBlack",		"rsc/[Monster]Gargoyle_Black.png");
	tm.graphics.TextureManager.add("GargoyleRed",		"rsc/[Monster]Gargoyle_Red.png");

	tm.graphics.TextureManager.add("DragonGreen",		"rsc/[Monster]Dragon_Green.png");
	tm.graphics.TextureManager.add("DragonBlue",		"rsc/[Monster]Dragon_Blue.png");
	tm.graphics.TextureManager.add("DragonRed",			"rsc/[Monster]Dragon_Red.png");
	tm.graphics.TextureManager.add("DragonBlack",		"rsc/[Monster]Dragon_Black.png");
	tm.graphics.TextureManager.add("DragonWhite",		"rsc/[Monster]Dragon_White.png");
	tm.graphics.TextureManager.add("DragonGhost",		"rsc/[Monster]Dragon_Ghost.png");

	tm.graphics.TextureManager.add("Death",				"rsc/[Monster]Death_Uroboros.png");


	// エフェクト
	tm.graphics.TextureManager.add("slash", 		"rsc/boldslash.png");

	// マップ
	tm.graphics.TextureManager.add("Dirt1_pipo", 	"rsc/[A]Dirt1_pipo.png");
	tm.graphics.TextureManager.add("Grass1_pipo", 	"rsc/[A]Grass1_pipo.png");
	tm.graphics.TextureManager.add("Water2_pipo", 	"rsc/[A]Water2_pipo.png");
	tm.graphics.TextureManager.add("stairs", 		"rsc/stairs.png");

	// アイテム
	tm.graphics.TextureManager.add("dropWeapon",   	"rsc/drop_weapon.png");
	tm.graphics.TextureManager.add("dropTreasure", 	"rsc/item.png");

});
