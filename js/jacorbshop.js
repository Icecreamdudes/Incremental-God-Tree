addLayer("j", {
    name: "Jacorb's Shop", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "J", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            shopcutscene: new Decimal(1),
            shopscene: new Decimal(0),
            jacorbtokens: new Decimal(0),
            jacorbtokenspersecond: new Decimal(0),
            jacorbtokengain: new Decimal(0.0001),
    }
    },
    nodeStyle: {
        background: "purple",
        "background-origin": "border-box",
        "border-radius": "10px",
        "box-shadow": "0 0 0 purple",
        animation: "pulse 1s infinite",

    },
    color: "purple",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tooltip: "Jacorb's Shop", // Row the layer is in on the tree (0 is the first row)
    update(delta) {
        if (player.j.shopscene.eq(37)) {
            player.j.shopcutscene = new Decimal(0)
        } 
        if (player.j.shopscene.lt(1) || player.j.shopscene.gt(37)) {
            player.j.shopscene = new Decimal(1)
        } 
        player.j.jacorbtokens = player.j.jacorbtokens.add(player.j.jacorbtokenspersecond.mul(delta))

        player.j.jacorbtokenspersecond = buyableEffect("j", 11)
        if (player.i.jacorbianunlock.eq(1)) player.j.jacorbtokenspersecond = player.j.jacorbtokenspersecond.mul(1.2)
        player.j.jacorbtokenspersecond = player.j.jacorbtokenspersecond.mul(player.h.jacorbshrinepowereffect)

        player.j.jacorbtokengain = new Decimal(0.0001)
        if (player.i.jacorbianunlock.eq(1)) player.j.jacorbtokengain = player.j.jacorbtokengain.mul(1.2)
        player.j.jacorbtokengain = player.j.jacorbtokengain.mul(buyableEffect("j", 12))
        player.j.jacorbtokengain = player.j.jacorbtokengain.mul(buyableEffect("h", 43))
        player.j.jacorbtokengain = player.j.jacorbtokengain.mul(player.h.jacorbshrinepowereffect)
    },
    clickables: {
        11: {
            title() { return "<h2> Next  " },
            canClick() { return player.j.shopcutscene.eq(1) },
            unlocked() { return player.j.shopscene.neq(37) },
            onClick() {
                player.j.shopscene = player.j.shopscene.add(1)
            },
        },
        12: {
            title() { return "<h2>Gain " + format(player.j.jacorbtokengain) + " Tokens" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.j.jacorbtokens = player.j.jacorbtokens.add(player.j.jacorbtokengain)
            },
            style: { width: '250px', "min-height": '90px', "background-image": "linear-gradient(to bottom, purple, #EE82EE)", }
        },
    },
    upgrades: {
        11:
        {
            title: "Gamma-Eta Buyables",
            description: "Automates Gamma-Eta Buyables.",
            cost: new Decimal(2),
            currencyLocation() { return player.j },
            currencyDisplayName: "Jacorb Tokens",
            currencyInternalName: "jacorbtokens",
            style: { width: '200px', "min-height": '100px' }
        },
        12:
        {
            title: "True Singularity Dimensions",
            description: "Automates True Singularity Dimensions.",
            cost: new Decimal(4),
            currencyLocation() { return player.j },
            currencyDisplayName: "Jacorb Tokens",
            currencyInternalName: "jacorbtokens",
            style: { width: '200px', "min-height": '100px' }
        },
        13:
        {
            title: "WAP Buyables",
            description: "My old friend Aarex. I just want him to hear what I have to say.",
            cost: new Decimal(10),
            currencyLocation() { return player.j },
            currencyDisplayName: "Jacorb Tokens",
            currencyInternalName: "jacorbtokens",
            style: { width: '200px', "min-height": '100px' }
        },
        14:
        {
            title: "Cante Buyables",
            description: "Automates Cante Buyables.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade("i", 175) },
            currencyLocation() { return player.j },
            currencyDisplayName: "Jacorb Tokens",
            currencyInternalName: "jacorbtokens",
            style: { width: '200px', "min-height": '100px' }
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.01) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.0001) },
            unlocked() { return true },
            canAfford() { return player.j.jacorbtokens.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Jacorbian Priest"
            },
            display() {
                return "which gives +" + format(tmp[this.layer].buyables[this.id].effect) + " jacorb tokens per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jacorb Tokens"
            },
            buy() {
                let base = new Decimal(0.01)
                let growth = 1.2
                let max = Decimal.affordGeometricSeries(player.j.jacorbtokens, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.j.jacorbtokens = player.j.jacorbtokens.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { width: '250px', "min-height": '90px', "background-image": "linear-gradient(to bottom, purple, #EE82EE)", }
        },
        12: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.j.jacorbtokens.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Jacorbian Disciple"
            },
            display() {
                return "which boosts token gain from clicks by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jacorb Tokens"
            },
            buy() {
                let base = new Decimal(0.1)
                let growth = 1.5
                let max = Decimal.affordGeometricSeries(player.j.jacorbtokens, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.j.jacorbtokens = player.j.jacorbtokens.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { width: '250px', "min-height": '90px', "background-image": "linear-gradient(to bottom, purple, #EE82EE)", }
        },
    },
    bars: {
    },
    microtabs: {
        stuff: {
            "Cutscene": {
                unlocked() { return player.j.shopcutscene.neq(0) },
                buttonStyle() { return { 'color': 'purple' } },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.j.shopscene.eq(1) ? "<h1> Psst. It's me again. Thanks for buying that upgrade. Now I can reopen my old shop! " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(2) ? "<h1> This shop will unlock so many things that you would need. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(3) ? "<h1> QoL, Autobuyers, Boosters, Unlocks, Everything! This would help you out a lot. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(4) ? "<h1> Especially with the celestials you are currently in. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(5) ? "<h1> Make sure you get as many jacorb tokens as possible. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(6) ? "<h1> If you get enough simultaneously you can revive the path of elementary. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(7) ? "<h1> That would be the next step in freeing me. Eventually, I can break out of exile. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(8) ? "<h1> You see, a very long time ago, before I was a noble, I was a normal kid. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(9) ? "<h1> No powers, no balancing, no nothing. Just ordinary Jacorb. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(10) ? "<h1> I had a passion; going on runs. I was always trying to go faster." : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(11) ? "<h1> I eventually got a car. Which I modified and added rockets to. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(12) ? "<h1> My curiosity peaked when I found these new technologies; " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(13) ? "<h1> Automation. The furnace. Energy. Time reversal. Cadavers. Pathogens. Dark Circle. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(14) ? "<h1> All of these I used to my advantage. Before I knew it, I was in space. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(15) ? "<h1> Everything changed when I reached infinity. A power rarely seen before. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(16) ? "<h1> Before the time of nobles, Infinity was different. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(17) ? "<h1> Its power was stored in knowledge instead of points. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(18) ? "<h1> Eventually, I reached the six high gods of incremental powers. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(19) ? "<h1> Infinity. Eternity. Spaceon. Solaris. Reality. Drigganiz. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(20) ? "<h1> They granted me immense powers. I kept on going. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(21) ? "<h1> I jumped between dimensions and dimensions. I never stopped. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(22) ? "<h1> I harnessed elementary power. Theories. Foam. Skyrmions. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(23) ? "<h1> I no longer abided by the laws of physics. Physics abides to me. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(24) ? "<h1> I eventually gained multiversal energy. Now I am on top. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(25) ? "<h1> So I thought. I was still far from reaching the top of the top. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(26) ? "<h1> I eventually capped out. It was enough for now. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(27) ? "<h1> One day, I was just chilling until two mysterious beings came towards me. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(28) ? "<h1> The high gods of the backrooms and the void. Beings of incomprehensible power. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(29) ? "<h1> They offered me a job. A job to protect and improve their realms. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(30) ? "<h1> Without anything to do, I reluctantly agreed. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(31) ? "<h1> Here I am now. Maybe I should have kept doing what I was doing. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(32) ? "<h1> I need you to go down the elementary path, not only to free me. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(33) ? "<h1> You also need to reach contact with the high gods of incremental powers. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(34) ? "<h1> I have no clue if they are celestial beings or not, but they need me. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(35) ? "<h1> I can feel it. I must pay them back for the power they have given me. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.j.shopscene.eq(36) ? "<h1> Good luck, my friend. Stay safe. " : "" }, { "color": "purple", "font-size": "18px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                ]

            },
            "Main Shop": {
                unlocked() { return player.j.shopcutscene.eq(0) },
                buttonStyle() { return { 'color': 'purple' } },
                content: [
                    ["raw-html", function () { return "<h1>You have " + format(player.j.jacorbtokens) + " Jacorb Tokens"}, { "color": "purple", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "50px"],
                    ["raw-html", function () { return "<h1>Automation Upgrades (Cuz you know, I'm the mage of automation)"}, { "color": "purple", "font-size": "16px", "font-family": "monospace" }],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                ]

            },
            "Earn Tokens": {
                unlocked() { return player.j.shopcutscene.eq(0) },
                buttonStyle() { return { 'color': 'purple' } },
                content: [
                    ["raw-html", function () { return "<h1>You have " + format(player.j.jacorbtokens) + " Jacorb Tokens"}, { "color": "purple", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>You are gaining " + format(player.j.jacorbtokenspersecond) + " per second"}, { "color": "purple", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12]]],
                ]

            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "<h2>Note: Jacorb Tokens can be hard to gain. :)"}, { "color": "purple", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.i.jacorbianunlock.eq(1) ? "<h3>Thanks for balancing -Jacorb (1.2x token gain from all sources)" : "" }, { "color": "purple", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
        ["raw-html", function () { return options.musicToggle && player.j.shopcutscene.eq(0) ? "<audio controls autoplay loop hidden><source src=music/jacorbshop.mp3 type<=audio/mp3>loop=true hidden=true autostart=true</audio>" : ""}],
    ],
    layerShown() {
        return hasUpgrade("i", 172)
    }
})
