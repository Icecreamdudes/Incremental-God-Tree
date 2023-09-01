addLayer("h", {
    name: "The Hub", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            potential: new Decimal(0),
            willpower: new Decimal(10),
            willpowereffect: new Decimal(0),
            willpowerpersecond: new Decimal(0),
            shrinepower: new Decimal(0),
            shrinepowereffect: new Decimal(0),
            //presitge power
            prestigepowerunlock: new Decimal(0),
            prestigepower: new Decimal(0),
            prestigepowertoget: new Decimal(0),
            nextprestigepower: new Decimal(0),
            prestigepowereffect: new Decimal(0),
            cosinebooster: new Decimal(0),
            cosinetimer: new Decimal(0),
            tangentbooster: new Decimal(0),
            tangenttimer: new Decimal(0),
            sinebooster: new Decimal(0),
            sinetimer: new Decimal(0),
            prestigepowereffect2: new Decimal(0),
            //assembly line
            assemblylineselect: new Decimal(0),
            assemblylinetypeselect: new Decimal(0), //1 - Red 2 - Green 3 - Blue 4 - Transport 5 - Finish
            slotstatus: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
            slotstatuspic: ["", "", "", "", "", "", ""],
            redenergy: new Decimal(0),
            greenenergy: new Decimal(0),
            blueenergy: new Decimal(0),
            slotredenergy: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
            slotgreenenergy: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
            slotblueenergy: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
            //aarexianenergy
            aarexianenergy: new Decimal(0),
            aarexianenergytoget: new Decimal(0),
            aarexianenergyeffect: new Decimal(1),
            //jacorb shrines
            jacorbshrinepower: new Decimal(0),
            jacorbshrinepowereffect: new Decimal(1),
        }
    },
    automate() {
        if (hasUpgrade('h', 25)) {
            buyBuyable(this.layer, 11)
            buyBuyable(this.layer, 12)
            buyBuyable(this.layer, 13)
            buyBuyable(this.layer, 14)
            buyBuyable(this.layer, 15)
            buyBuyable(this.layer, 16)
            buyBuyable(this.layer, 17)
            buyBuyable(this.layer, 18)
        }
        if (hasUpgrade('h', 29)) {
            buyBuyable(this.layer, 19)
            buyBuyable(this.layer, 21)
            buyBuyable(this.layer, 22)
            buyBuyable(this.layer, 23)
            buyBuyable(this.layer, 24)
            buyBuyable(this.layer, 25)
            buyBuyable(this.layer, 26)
            buyBuyable(this.layer, 27)
            buyBuyable(this.layer, 28)
            buyBuyable(this.layer, 29)
            buyBuyable(this.layer, 31)
        }
    },
    nodeStyle() {
        return {
            "background-image": "linear-gradient(85deg, #fbef53, #68e8f4, #fbef53)",
            "width": 400,
            "height": 400,
            'min-height': '150px',
            'min-width': '150px',
        }
    },
    color: "#68e8f4",
    symbol: "<p style='transform: scale(3, 3)'><alternate>H</alternate></p>",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tooltip: "The Hub", // Row the layer is in on the tree (0 is the first row)
    displayRow: 2, // Row the layer is in on the tree (0 is the first row)
    // Optional, lets you format the tab yourself by listing components. You can create your own components in v.js.
    // This is also non minimal, a Clickable!
    branches: ["i"],
    hotkeys: [
    ],
    buyables: {
        11: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id)},
            unlocked() { return true },
            canAfford() { return player.h.willpower.gte(this.cost())},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Willpower Generator"
            },
            display() {
                return "which gives +" + format(tmp[this.layer].buyables[this.id].effect) + " willpower per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Willpower"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.h.willpower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade('h', 25)) player.h.willpower = player.h.willpower.sub(cost)              
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        12: {
            cost(x) { return new Decimal(5).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return true },
            canAfford() { return player.h.willpower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Pre-Infinity"
            },
            display() {
                return "which are boosting your pre-infinity resource gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Willpower"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 5
                let max = Decimal.affordGeometricSeries(player.h.willpower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade('h', 25)) player.h.willpower = player.h.willpower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        13: {
            cost(x) { return new Decimal(7).pow(x || getBuyableAmount(this.layer, this.id)).mul(75) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return true },
            canAfford() { return player.h.willpower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Infinity Points"
            },
            display() {
                return "which are boosting your infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Willpower"
            },
            buy() {
                let base = new Decimal(75)
                let growth = 7
                let max = Decimal.affordGeometricSeries(player.h.willpower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade('h', 25)) player.h.willpower = player.h.willpower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        14: {
            cost(x) { return new Decimal(11).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.willpower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Infinities"
            },
            display() {
                return "which are boosting your infinity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Willpower"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 11
                let max = Decimal.affordGeometricSeries(player.h.willpower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade('h', 25)) player.h.willpower = player.h.willpower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        15: {
            cost(x) { return new Decimal(9).pow(x || getBuyableAmount(this.layer, this.id)).mul(66666) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return hasUpgrade("i", 74) || player.i.singularityunlocked.eq(1) },
            canAfford() { return player.h.willpower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Broken Infinities"
            },
            display() {
                return "which are boosting your broken infinity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Willpower"
            },
            buy() {
                let base = new Decimal(66666)
                let growth = 9
                let max = Decimal.affordGeometricSeries(player.h.willpower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade('h', 25)) player.h.willpower = player.h.willpower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        16: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return hasUpgrade("i", 79) || player.i.singularityunlocked.eq(1) },
            canAfford() { return player.h.willpower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Willpower Generator II"
            },
            display() {
                return "which gives a x" + format(tmp[this.layer].buyables[this.id].effect) + " boost to willpower per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Willpower"
            },
            buy() {
                let base = new Decimal(10000)
                let growth = 2.5
                let max = Decimal.affordGeometricSeries(player.h.willpower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade('h', 25)) player.h.willpower = player.h.willpower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        17: {
            cost(x) { return new Decimal(8.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(99999) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return hasUpgrade("i", 79) || player.i.singularityunlocked.eq(1) },
            canAfford() { return player.h.willpower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Replication"
            },
            display() {
                return "which are boosting your replicanti multiplier by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Willpower"
            },
            buy() {
                let base = new Decimal(99999)
                let growth = 8.4
                let max = Decimal.affordGeometricSeries(player.h.willpower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade('h', 25)) player.h.willpower = player.h.willpower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        18: {
            cost(x) { return new Decimal(11.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(500000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return hasUpgrade("i", 87) || player.i.singularityunlocked.eq(1) },
            canAfford() { return player.h.willpower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Infinity Dimensions"
            },
            display() {
                return "which are boosting your infinity dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Willpower"
            },
            buy() {
                let base = new Decimal(500000)
                let growth = 11.2
                let max = Decimal.affordGeometricSeries(player.h.willpower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade('h', 25)) player.h.willpower = player.h.willpower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        19: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.redenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Red Energy Buyable"
            },
            display() {
                return "which are boosting your willpower by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Red Energy"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.h.redenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.redenergy = player.h.redenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "color": 'red' }
        },
        21: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.greenenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Green Energy Buyable"
            },
            display() {
                return "which are boosting your prestige power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Green Energy"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.h.greenenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.greenenergy = player.h.greenenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "color": 'green' }
        },
        22: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.blueenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Blue Energy Buyable"
            },
            display() {
                return "which are boosting your shrine power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Blue Energy"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.h.blueenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.blueenergy = player.h.blueenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "color": 'blue' }
        },
        23: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return player.i.singularityunlocked.eq(1) },
            canAfford() { return player.h.prestigepower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Pre-Singularity"
            },
            display() {
                return "which are boosting your pre-singularity resources by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Power"
            },
            buy() {
                let base = new Decimal(4)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.h.prestigepower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.prestigepower = player.h.prestigepower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        24: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return player.i.singularityunlocked.eq(1) },
            canAfford() { return player.h.prestigepower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Singularity Points"
            },
            display() {
                return "which are boosting your singularity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Power"
            },
            buy() {
                let base = new Decimal(8)
                let growth = 2.5
                let max = Decimal.affordGeometricSeries(player.h.prestigepower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.prestigepower = player.h.prestigepower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        25: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(12) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.8).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return player.i.singularityunlocked.eq(1) },
            canAfford() { return player.h.prestigepower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Singularity Dimensions"
            },
            display() {
                return "which are boosting your singularity dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Power"
            },
            buy() {
                let base = new Decimal(12)
                let growth = 3
                let max = Decimal.affordGeometricSeries(player.h.prestigepower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.prestigepower = player.h.prestigepower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        26: {
            cost(x) { return new Decimal(5).pow(x || getBuyableAmount(this.layer, this.id)).mul(20) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return player.i.singularityunlocked.eq(1) },
            canAfford() { return player.h.prestigepower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Singularities"
            },
            display() {
                return "which are boosting your singularities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Power"
            },
            buy() {
                let base = new Decimal(20)
                let growth = 5
                let max = Decimal.affordGeometricSeries(player.h.prestigepower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.prestigepower = player.h.prestigepower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        27: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return hasUpgrade("i", 95) },
            canAfford() { return player.h.redenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Singularity Leaves"
            },
            display() {
                return "which are boosting your singularity leaves by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Red Energy"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 3
                let max = Decimal.affordGeometricSeries(player.h.redenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.redenergy = player.h.redenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        28: {
            cost(x) { return new Decimal(4).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return hasUpgrade("i", 95) },
            canAfford() { return player.h.greenenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Singularity Tree Softcap Start"
            },
            display() {
                return "which are extending your singularity tree softcap start by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Green Energy"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 4
                let max = Decimal.affordGeometricSeries(player.h.greenenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.greenenergy = player.h.greenenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        29: {
            cost(x) { return new Decimal(5).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return hasUpgrade("i", 104) },
            canAfford() { return player.h.blueenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Blessings"
            },
            display() {
                return "which are boosting your blessings by x" + format(tmp[this.layer].buyables[this.id].effect) + ". (Doesn't boost singularity blessings)\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Blue Energy"
            },
            buy() {
                let base = new Decimal(15)
                let growth = 5
                let max = Decimal.affordGeometricSeries(player.h.blueenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.blueenergy = player.h.blueenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        31: {
            cost(x) { return new Decimal(4).pow(x || getBuyableAmount(this.layer, this.id)).mul(400) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1).pow(player.i.omegapointseffect) },
            unlocked() { return hasUpgrade("i", 126) },
            canAfford() { return player.h.prestigepower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Void"
            },
            display() {
                return "which are boosting your void singularities and points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Power"
            },
            buy() {
                let base = new Decimal(400)
                let growth = 4
                let max = Decimal.affordGeometricSeries(player.h.prestigepower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("h", 29)) player.h.prestigepower = player.h.prestigepower.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        32: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.i.omegapointseffect.plus(1).log10()).pow(1.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.aarexianenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of ω"
            },
            display() {
                return "which are boosting your ω by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Aarexian Energy"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1.5
                let max = Decimal.affordGeometricSeries(player.h.aarexianenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.aarexianenergy = player.h.aarexianenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        33: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(400) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.aarexianenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Omega Layers"
            },
            display() {
                return "which are boosting your omega layers resources by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Aarexian Energy"
            },
            buy() {
                let base = new Decimal(400)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.h.aarexianenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.aarexianenergy = player.h.aarexianenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        34: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(800) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.4).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.aarexianenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of True Singularity"
            },
            display() {
                return "which are boosting your true singularity xp gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Aarexian Energy"
            },
            buy() {
                let base = new Decimal(800)
                let growth = 2.5
                let max = Decimal.affordGeometricSeries(player.h.aarexianenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.aarexianenergy = player.h.aarexianenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        35: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.6).add(1) },
            unlocked() { return hasMilestone("i", 28) },
            canAfford() { return player.h.aarexianenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of True Singularity"
            },
            display() {
                return "which are boosting your true singularity dimensions gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Aarexian Energy"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.h.aarexianenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.aarexianenergy = player.h.aarexianenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        36: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(5000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.6).add(1) },
            unlocked() { return hasUpgrade("i", 168) },
            canAfford() { return player.h.aarexianenergy.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Cante"
            },
            display() {
                return "which are boosting cantecanti fragment gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Aarexian Energy"
            },
            buy() {
                let base = new Decimal(5000)
                let growth = 1.5
                let max = Decimal.affordGeometricSeries(player.h.aarexianenergy, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.aarexianenergy = player.h.aarexianenergy.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
        },
        37: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return hasUpgrade("h", 34) },
            canAfford() { return player.j.jacorbtokens.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Willpower"
            },
            display() {
                return "which are boosting willpower gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jacorb Tokens"
            },
            buy() {
                let base = new Decimal(0.2)
                let growth = 1.2
                let max = Decimal.affordGeometricSeries(player.j.jacorbtokens, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.j.jacorbtokens = player.j.jacorbtokens.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "purple", }
        },
        38: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return hasUpgrade("h", 34) },
            canAfford() { return player.j.jacorbtokens.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Prestige Power"
            },
            display() {
                return "which are boosting prestige power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jacorb Tokens"
            },
            buy() {
                let base = new Decimal(0.3)
                let growth = 1.3
                let max = Decimal.affordGeometricSeries(player.j.jacorbtokens, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.j.jacorbtokens = player.j.jacorbtokens.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "purple", }
        },
        39: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.6).add(1) },
            unlocked() { return hasUpgrade("h", 34) },
            canAfford() { return player.j.jacorbtokens.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Assembly"
            },
            display() {
                return "which are boosting assembly line speed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jacorb Tokens"
            },
            buy() {
                let base = new Decimal(0.5)
                let growth = 1.4
                let max = Decimal.affordGeometricSeries(player.j.jacorbtokens, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.j.jacorbtokens = player.j.jacorbtokens.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "purple", }
        },
        41: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(0.8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.4).add(1) },
            unlocked() { return hasUpgrade("h", 34) },
            canAfford() { return player.j.jacorbtokens.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Lost Friendship"
            },
            display() {
                return "which are boosting aarexian energy by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jacorb Tokens"
            },
            buy() {
                let base = new Decimal(0.8)
                let growth = 1.5
                let max = Decimal.affordGeometricSeries(player.j.jacorbtokens, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.j.jacorbtokens = player.j.jacorbtokens.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "purple", }
        },
        42: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(1.2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return hasUpgrade("h", 34) },
            canAfford() { return player.j.jacorbtokens.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of My Creations"
            },
            display() {
                return "which are boosting jacorb mods by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jacorb Tokens"
            },
            buy() {
                let base = new Decimal(1.2)
                let growth = 1.6
                let max = Decimal.affordGeometricSeries(player.j.jacorbtokens, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.j.jacorbtokens = player.j.jacorbtokens.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "purple", }
        },
        43: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(2.5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return hasUpgrade("h", 34) },
            canAfford() { return player.j.jacorbtokens.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Shrine of Myself"
            },
            display() {
                return "which are boosting jacorb tokens from all sources by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jacorb Tokens"
            },
            buy() {
                let base = new Decimal(2.5)
                let growth = 2
                let max = Decimal.affordGeometricSeries(player.j.jacorbtokens, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.j.jacorbtokens = player.j.jacorbtokens.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            },
            style: { "background-color": "purple", }
        },
    },
    upgrades: {
        11:
        {
            title: "Finally, time to BREAK INFINITY!!!",
            description: "Unlock Break Infinity",
            cost: new Decimal(1000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        12:
        {
            title: "Break Those Infinities!",
            description: "x1.5 Broken Infinity Generation.",
            unlocked() { return hasUpgrade("h", 11) },
            cost: new Decimal(25000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        13:
        {
            title: "Make Those Infinities!",
            description: "x1.2 Infinity Generation",
            unlocked() { return hasUpgrade("h", 12) },
            cost: new Decimal(75000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        14:
        {
            title: "Boost Those Infinity Points!",
            description: "Boost infinity point gain based on potential.",
            unlocked() { return hasUpgrade("h", 12) },
            cost: new Decimal(400000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.h.potential.pow(1.2).add(1)
            },
        },
        15:
        {
            title: "QoL is amazing.",
            description: "Autobuys replicanti buyables that cost replicanti.",
            unlocked() { return hasUpgrade("h", 14) },
            cost: new Decimal(800000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        16:
        {
            title: "Timewall Upgrade (Yes it is worth it).",
            description: "Unlocks a unique prestige layer.",
            unlocked() { return hasUpgrade("h", 15) },
            cost: new Decimal(4000000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
        },
        17:
        {
            title: "Cosine Booster",
            description: "Unlocks cosine booster.",
            unlocked() { return hasUpgrade("h", 16) },
            cost: new Decimal(1),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        18:
        {
            title: "Tangent Booster",
            description: "Unlocks tangent booster.",
            unlocked() { return hasUpgrade("h", 16) },
            cost: new Decimal(1),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        19:
        {
            title: "Sine Booster",
            description: "Unlocks sine booster.",
            unlocked() { return hasUpgrade("h", 16) },
            cost: new Decimal(1),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        21:
        {
            title: "Assembly Line",
            description: "Unlocks the assembly line.",
            unlocked() { return true },
            cost: new Decimal(10),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        22:
        {
            title: "Red Booster",
            description: "Boosts singularity gain based on red energy.",
            unlocked() { return player.i.singularityunlocked.eq(1) },
            cost: new Decimal(1e9),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.h.redenergy.pow(0.05).add(1)
            },
        },
        23:
        {
            title: "Green Booster",
            description: "Boosts singularity dimensions based on green energy.",
            unlocked() { return player.i.singularityunlocked.eq(1) },
            cost: new Decimal(1e10),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.h.greenenergy.pow(0.7).add(1)
            },
        },
        24:
        {
            title: "Blue Booster",
            description: "Boosts singularity leaves based on blue energy.",
            unlocked() { return player.i.singularityunlocked.eq(1) },
            cost: new Decimal(1e11),
            currencyLocation() { return player.h },
            currencyDisplayName: "Willpower",
            currencyInternalName: "willpower",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            effect() {
                return player.h.blueenergy.pow(0.5).add(1)
            },
        },
        25:
        {
            title: "Sweet, Sweet, Automation.",
            description: "Autobuys willpower generators and infinity shrines.",
            unlocked() { return true },
            cost: new Decimal(250),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        26:
        {
            title: "You would really want this.",
            description: "Unlocks achievement points (in achievements layer).",
            unlocked() { return hasUpgrade("h", 25) },
            cost: new Decimal(5000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        27:
        {
            title: "Adjusters",
            description: "Unlocks trig booster adjusters.",
            unlocked() { return hasUpgrade("h", 25) },
            cost: new Decimal(5000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        28:
        {
            title: "More Energy!",
            description: "Unlocks aarexian energy.",
            unlocked() { return hasUpgrade("h", 26) },
            cost: new Decimal(15000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        29:
        {
            title: "Who the hell is Aarex?",
            description: "Autobuys RBG energy buyables and singularity shrines.",
            unlocked() { return hasUpgrade("h", 28) },
            cost: new Decimal(1000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Aarexian Energy",
            currencyInternalName: "aarexianenergy",
        },
        31:
        {
            title: "Can I be the Aa to your Rex?",
            description: "Unlocks omega shrines.",
            unlocked() { return hasUpgrade("h", 29) },
            cost: new Decimal(2500),
            currencyLocation() { return player.h },
            currencyDisplayName: "Aarexian Energy",
            currencyInternalName: "aarexianenergy",
        },
        32:
        {
            title: "Artifact (x)",
            unlocked() { return hasUpgrade("i", 157) },
            cost: new Decimal("5000"),
            currencyLocation() { return player.h },
            currencyDisplayName: "Aarexian Energy",
            currencyInternalName: "aarexianenergy",
        },
        33:
        {
            title: "Aarex's Blessing",
            description: "Gain 100% of aarexian energy per second.",
            unlocked() { return hasUpgrade("h", 28) },
            cost: new Decimal(10000000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
        34:
        {
            title: "Jacorb's Blessing",
            description: "Unlocks jacorbian shrines.",
            unlocked() { return hasUpgrade("h", 33) },
            cost: new Decimal(200000000),
            currencyLocation() { return player.h },
            currencyDisplayName: "Prestige Power",
            currencyInternalName: "prestigepower",
        },
    },
    clickables: {
        11: {
            title() { return "REQ: 1e308 Willpower (Can't do this in this update)" },
            canClick() { return false },
            unlocked() { return true },
            onClick() {
            },
        },
        12: {
            title() { return "Req: 1e10000 Points, 36 Achievement Power" },
            canClick() { return player.points.gte("1e10000") && player.a.achievementpower.gte(36) },
            unlocked() { return player.h.prestigepowerunlock.eq(0) },
            onClick() {
                player.h.prestigepowerunlock = new Decimal(1)
            },
        },
        13: {
            title() { return "<h2>Reset for " + format(player.h.prestigepowertoget, 0) + " prestige power " },
            unlocked() { return player.h.prestigepowerunlock.eq(1) },
            canClick() { return player.h.willpower.gt(10000) },
            onClick() {
                player.h.prestigepower = player.h.prestigepower.add(player.h.prestigepowertoget)
                player.h.willpower = new Decimal(10)
                player.h.buyables[11] = new Decimal(0)
                player.h.buyables[12] = new Decimal(0)
                player.h.buyables[13] = new Decimal(0)
                player.h.buyables[14] = new Decimal(0)
                player.h.buyables[15] = new Decimal(0)
                player.h.buyables[16] = new Decimal(0)
                player.h.buyables[17] = new Decimal(0)
                player.h.buyables[18] = new Decimal(0)
            },
            style: { width: '400px', "min-height": '100px' }
        },
        14: {
            title() { return "Slot 1" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylineselect = new Decimal(1)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        15: {
            title() { return "Slot 2" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylineselect = new Decimal(2)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        16: {
            title() { return "Slot 3" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylineselect = new Decimal(3)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        17: {
            title() { return "Slot 4" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylineselect = new Decimal(4)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        18: {
            title() { return "Slot 5" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylineselect = new Decimal(5)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        19: {
            title() { return "Slot 6" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylineselect = new Decimal(6)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        21: {
            title() { return "Slot 7" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylineselect = new Decimal(7)
            },
            style: { width: '80px', "min-height": '80px' }
        },
       /* 22: {
            title() { return "Slot 8" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylineselect = new Decimal(8)
            },
            display() {
                return "R: " + format(player.h.slotredenergy[8]) + "\nG: " + format(player.h.slotgreenenergy[8]) + "\nB: " + format(player.h.slotblueenergy[8])
            },
            style: { width: '80px', "min-height": '80px' }
        }, */ //Slot 8 serves no purpose
        23: {
            title() { return "<img src='resources/assemblylinered.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylinetypeselect = new Decimal(1)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        24: {
            title() { return "<img src='resources/assemblylinegreen.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylinetypeselect = new Decimal(2)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        25: {
            title() { return "<img src='resources/assemblylineblue.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylinetypeselect = new Decimal(3)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        26: {
            title() { return "<img src='resources/assemblylinearrow.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylinetypeselect = new Decimal(4)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        27: {
            title() { return "<img src='resources/assemblylinex.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.assemblylinetypeselect = new Decimal(5)
            },
            style: { width: '80px', "min-height": '80px' }
        },
        28: {
            title() { return "Reset Cosine" },
            canClick() { return true },
            unlocked() { return hasUpgrade("h", 27) },
            onClick() {
                player.h.cosinetimer = new Decimal(0)
            },
        },
        29: {
            title() { return "Reset Tangent" },
            canClick() { return true },
            unlocked() { return hasUpgrade("h", 27) },
            onClick() {
                player.h.tangenttimer = new Decimal(0)
            },
        },
        31: {
            title() { return "Reset Sine" },
            canClick() { return true },
            unlocked() { return hasUpgrade("h", 27) },
            onClick() {
                player.h.sinetimer = new Decimal(0)
            },
        },
        32: {
            title() { return "Give all energy to Aarex for aarexian energy" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.h.redenergy = new Decimal(0)
                player.h.greenenergy = new Decimal(0)
                player.h.blueenergy = new Decimal(0)

                player.h.aarexianenergy = player.h.aarexianenergy.add(player.h.aarexianenergytoget)
            },
        },
    },
    update(delta) {
        let onepersecond = new Decimal(1)

        player.h.willpowerpersecond = buyableEffect("h", 11)
        player.h.willpowerpersecond = player.h.willpowerpersecond.mul(player.h.shrinepowereffect)
        player.h.willpowerpersecond = player.h.willpowerpersecond.mul(buyableEffect("h", 16))
        if (hasUpgrade("h", 17)) player.h.willpowerpersecond = player.h.willpowerpersecond.mul(player.h.cosinebooster)
        if (hasUpgrade("h", 18)) player.h.willpowerpersecond = player.h.willpowerpersecond.mul(player.h.tangentbooster)
        if (hasUpgrade("h", 19)) player.h.willpowerpersecond = player.h.willpowerpersecond.mul(player.h.sinebooster)
        player.h.willpowerpersecond = player.h.willpowerpersecond.mul(player.h.prestigepowereffect2)
        player.h.willpowerpersecond = player.h.willpowerpersecond.mul(player.a.achievementpointseffect)
        player.h.willpowerpersecond = player.h.willpowerpersecond.mul(buyableEffect("h", 19))
        player.h.willpowerpersecond = player.h.willpowerpersecond.mul(buyableEffect("h", 37))

        player.h.willpower = player.h.willpower.add(player.h.willpowerpersecond.mul(delta))
        player.h.willpowereffect = player.h.willpower.plus(1).log10().pow(0.2)
        player.h.prestigepowereffect = player.h.prestigepower.plus(1).log10().pow(0.22)
        player.h.potential = player.h.willpowereffect.add(player.h.prestigepowereffect)

        player.h.shrinepower = player.h.buyables[12].add(player.h.buyables[13].add(player.h.buyables[14].add(player.h.buyables[15].add(player.h.buyables[17].add(player.h.buyables[23].mul(2).add(player.h.buyables[24].mul(2).add(player.h.buyables[25].mul(2).add(player.h.buyables[26].mul(2).add(player.h.buyables[27].mul(2).add(player.h.buyables[28].mul(2).add(player.h.buyables[29].mul(2).add(player.h.buyables[31].mul(2).add(player.h.buyables[32].mul(5)).add(player.h.buyables[33].mul(5).add(player.h.buyables[34].mul(5).add(player.h.buyables[35].mul(5).add(player.h.buyables[36].mul(5)))))))))))))))))
        player.h.shrinepower = player.h.shrinepower.mul(buyableEffect("h", 22))
        player.h.shrinepowereffect = player.h.shrinepower.add(1).pow(0.5)

        //trig boosters
        player.h.cosinetimer = player.h.cosinetimer.add(onepersecond.mul(0.1).mul(delta))
        player.h.cosinebooster = player.h.cosinetimer.sin().abs().add(1)

        player.h.tangenttimer = player.h.tangenttimer.add(onepersecond.mul(0.1).mul(delta))
        player.h.tangentbooster = player.h.tangenttimer.tan().abs().pow(0.5).add(1)

        player.h.sinetimer = player.h.sinetimer.add(onepersecond.mul(0.1).mul(delta))
        player.h.sinebooster = player.h.sinetimer.sin().abs().add(1)

        //prestigepower
        player.h.prestigepowertoget = player.h.willpower.div(10000).pow(0.2).floor()
        player.h.prestigepowertoget = player.h.prestigepowertoget.mul(buyableEffect("h", 21))
        player.h.prestigepowertoget = player.h.prestigepowertoget.mul(buyableEffect("h", 38))
        player.h.prestigepowereffect2 = player.h.prestigepower.pow(0.6).add(1)

        if (hasMilestone("h", 11)) player.h.prestigepower = player.h.prestigepower.add(player.h.prestigepowertoget.mul(0.5).mul(delta))

        //assembly line
        if (player.h.assemblylinetypeselect.eq(1))
        {
            player.h.slotstatus[player.h.assemblylineselect] = new Decimal(1)
            player.h.slotstatuspic[player.h.assemblylineselect] = "<img src='resources/assemblylinered.png'style='width:calc(5%);height:calc(5%);'></img>"
        }
        if (player.h.assemblylinetypeselect.eq(2)) {
            player.h.slotstatus[player.h.assemblylineselect] = new Decimal(2)
            player.h.slotstatuspic[player.h.assemblylineselect] = "<img src='resources/assemblylinegreen.png'style='width:calc(5%);height:calc(5%);'></img>"
        }
        if (player.h.assemblylinetypeselect.eq(3)) {
            player.h.slotstatus[player.h.assemblylineselect] = new Decimal(3)
            player.h.slotstatuspic[player.h.assemblylineselect] = "<img src='resources/assemblylineblue.png'style='width:calc(5%);height:calc(5%);'></img>"
        }
        if (player.h.assemblylinetypeselect.eq(4)) {
            player.h.slotstatus[player.h.assemblylineselect] = new Decimal(4)
            player.h.slotstatuspic[player.h.assemblylineselect] = "<img src='resources/assemblylinearrowwhite.png'style='width:calc(5%);height:calc(5%);'></img>"
        }
        if (player.h.assemblylinetypeselect.eq(5)) {
            player.h.slotstatus[player.h.assemblylineselect] = new Decimal(5)
            player.h.slotstatuspic[player.h.assemblylineselect] = "<img src='resources/assemblylinex.png'style='width:calc(5%);height:calc(5%);'></img>"
        }

        let redenergypersecond = new Decimal(1)
        let greenenergypersecond = new Decimal(1)
        let blueenergypersecond = new Decimal(1)
        let transportspeed = new Decimal(0.5)
        let harvestspeed = new Decimal(5)
        let assemblylinespeed = new Decimal(1)

        assemblylinespeed = assemblylinespeed.mul(player.h.aarexianenergyeffect)
        assemblylinespeed = assemblylinespeed.mul(buyableEffect("h", 39))

        redenergypersecond = redenergypersecond.mul(assemblylinespeed)
        greenenergypersecond = greenenergypersecond.mul(assemblylinespeed)
        blueenergypersecond = blueenergypersecond.mul(assemblylinespeed)
        transportspeed = transportspeed.mul(assemblylinespeed)
        harvestspeed = harvestspeed.mul(assemblylinespeed)

        if (player.h.slotstatus[1].eq(1)) {
            player.h.slotredenergy[1] = player.h.slotredenergy[1].add(redenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[2].eq(1)) {
            player.h.slotredenergy[2] = player.h.slotredenergy[2].add(redenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[3].eq(1)) {
            player.h.slotredenergy[3] = player.h.slotredenergy[3].add(redenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[4].eq(1)) {
            player.h.slotredenergy[4] = player.h.slotredenergy[4].add(redenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[5].eq(1)) {
            player.h.slotredenergy[5] = player.h.slotredenergy[5].add(redenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[6].eq(1)) {
            player.h.slotredenergy[6] = player.h.slotredenergy[6].add(redenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[7].eq(1)) {
            player.h.slotredenergy[7] = player.h.slotredenergy[7].add(redenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[1].eq(2)) {
            player.h.slotgreenenergy[1] = player.h.slotgreenenergy[1].add(greenenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[2].eq(2)) {
            player.h.slotgreenenergy[2] = player.h.slotgreenenergy[2].add(greenenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[3].eq(2)) {
            player.h.slotgreenenergy[3] = player.h.slotgreenenergy[3].add(greenenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[4].eq(2)) {
            player.h.slotgreenenergy[4] = player.h.slotgreenenergy[4].add(greenenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[5].eq(2)) {
            player.h.slotgreenenergy[5] = player.h.slotgreenenergy[5].add(greenenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[6].eq(2)) {
            player.h.slotgreenenergy[6] = player.h.slotgreenenergy[6].add(greenenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[7].eq(2)) {
            player.h.slotgreenenergy[7] = player.h.slotgreenenergy[7].add(greenenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[1].eq(3)) {
            player.h.slotblueenergy[1] = player.h.slotblueenergy[1].add(blueenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[2].eq(3)) {
            player.h.slotblueenergy[2] = player.h.slotblueenergy[2].add(blueenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[3].eq(3)) {
            player.h.slotblueenergy[3] = player.h.slotblueenergy[3].add(blueenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[4].eq(3)) {
            player.h.slotblueenergy[4] = player.h.slotblueenergy[4].add(blueenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[5].eq(3)) {
            player.h.slotblueenergy[5] = player.h.slotblueenergy[5].add(blueenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[6].eq(3)) {
            player.h.slotblueenergy[6] = player.h.slotblueenergy[6].add(blueenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[7].eq(3)) {
            player.h.slotblueenergy[7] = player.h.slotblueenergy[7].add(blueenergypersecond.mul(delta))
        }
        if (player.h.slotstatus[1].eq(4)) {
            if (player.h.slotredenergy[1].gt(1)) {
                player.h.slotredenergy[1] = player.h.slotredenergy[1].sub(transportspeed.mul(delta))
                player.h.slotredenergy[2] = player.h.slotredenergy[2].add(transportspeed.mul(delta))
            }
            if (player.h.slotblueenergy[1].gt(1)) {
                player.h.slotblueenergy[1] = player.h.slotblueenergy[1].sub(transportspeed.mul(delta))
                player.h.slotblueenergy[2] = player.h.slotblueenergy[2].add(transportspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[1].gt(1)) {
                player.h.slotgreenenergy[1] = player.h.slotgreenenergy[1].sub(transportspeed.mul(delta))
                player.h.slotgreenenergy[2] = player.h.slotgreenenergy[2].add(transportspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[2].eq(4)) {
            if (player.h.slotredenergy[1].gt(1)) {
                player.h.slotredenergy[1] = player.h.slotredenergy[1].sub(transportspeed.mul(delta))
                player.h.slotredenergy[3] = player.h.slotredenergy[3].add(transportspeed.mul(delta))
            }
            if (player.h.slotblueenergy[1].gt(1)) {
                player.h.slotblueenergy[1] = player.h.slotblueenergy[1].sub(transportspeed.mul(delta))
                player.h.slotblueenergy[3] = player.h.slotblueenergy[3].add(transportspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[1].gt(1)) {
                player.h.slotgreenenergy[1] = player.h.slotgreenenergy[1].sub(transportspeed.mul(delta))
                player.h.slotgreenenergy[3] = player.h.slotgreenenergy[3].add(transportspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[3].eq(4)) {
            if (player.h.slotredenergy[2].gt(1)) {
                player.h.slotredenergy[2] = player.h.slotredenergy[2].sub(transportspeed.mul(delta))
                player.h.slotredenergy[4] = player.h.slotredenergy[4].add(transportspeed.mul(delta))
            }
            if (player.h.slotblueenergy[2].gt(1)) {
                player.h.slotblueenergy[2] = player.h.slotblueenergy[2].sub(transportspeed.mul(delta))
                player.h.slotblueenergy[4] = player.h.slotblueenergy[4].add(transportspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[2].gt(1)) {
                player.h.slotgreenenergy[2] = player.h.slotgreenenergy[2].sub(transportspeed.mul(delta))
                player.h.slotgreenenergy[4] = player.h.slotgreenenergy[4].add(transportspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[4].eq(4)) {
            if (player.h.slotredenergy[3].gt(1)) {
                player.h.slotredenergy[3] = player.h.slotredenergy[3].sub(transportspeed.mul(delta))
                player.h.slotredenergy[5] = player.h.slotredenergy[5].add(transportspeed.mul(delta))
            }
            if (player.h.slotblueenergy[3].gt(1)) {
                player.h.slotblueenergy[3] = player.h.slotblueenergy[3].sub(transportspeed.mul(delta))
                player.h.slotblueenergy[5] = player.h.slotblueenergy[5].add(transportspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[3].gt(1)) {
                player.h.slotgreenenergy[3] = player.h.slotgreenenergy[3].sub(transportspeed.mul(delta))
                player.h.slotgreenenergy[5] = player.h.slotgreenenergy[5].add(transportspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[5].eq(4)) {
            if (player.h.slotredenergy[4].gt(1)) {
                player.h.slotredenergy[4] = player.h.slotredenergy[4].sub(transportspeed.mul(delta))
                player.h.slotredenergy[6] = player.h.slotredenergy[6].add(transportspeed.mul(delta))
            }
            if (player.h.slotblueenergy[4].gt(1)) {
                player.h.slotblueenergy[4] = player.h.slotblueenergy[4].sub(transportspeed.mul(delta))
                player.h.slotblueenergy[6] = player.h.slotblueenergy[6].add(transportspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[4].gt(1)) {
                player.h.slotgreenenergy[4] = player.h.slotgreenenergy[4].sub(transportspeed.mul(delta))
                player.h.slotgreenenergy[6] = player.h.slotgreenenergy[6].add(transportspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[6].eq(4)) {
            if (player.h.slotredenergy[5].gt(1)) {
                player.h.slotredenergy[5] = player.h.slotredenergy[5].sub(transportspeed.mul(delta))
                player.h.slotredenergy[7] = player.h.slotredenergy[7].add(transportspeed.mul(delta))
            }
            if (player.h.slotblueenergy[5].gt(1)) {
                player.h.slotblueenergy[5] = player.h.slotblueenergy[5].sub(transportspeed.mul(delta))
                player.h.slotblueenergy[7] = player.h.slotblueenergy[7].add(transportspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[5].gt(1)) {
                player.h.slotgreenenergy[5] = player.h.slotgreenenergy[5].sub(transportspeed.mul(delta))
                player.h.slotgreenenergy[7] = player.h.slotgreenenergy[7].add(transportspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[7].eq(4)) {
            console.log("bro this is useless lol")
        }
        if (player.h.slotstatus[1].eq(5)) {
            if (player.h.slotredenergy[1].gt(1)) {
                player.h.redenergy = player.h.redenergy.add(harvestspeed.mul(delta))
                player.h.slotredenergy[1] = player.h.slotredenergy[1].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[1].gt(1)) {
                player.h.greenenergy = player.h.greenenergy.add(harvestspeed.mul(delta))
                player.h.slotgreenenergy[1] = player.h.slotgreenenergy[1].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotblueenergy[1].gt(1)) {
                player.h.blueenergy = player.h.blueenergy.add(harvestspeed.mul(delta))
                player.h.slotblueenergy[1] = player.h.slotblueenergy[1].sub(harvestspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[2].eq(5)) {
            if (player.h.slotredenergy[2].gt(1)) {
                player.h.redenergy = player.h.redenergy.add(harvestspeed.mul(delta))
                player.h.slotredenergy[2] = player.h.slotredenergy[2].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[2].gt(1)) {
                player.h.greenenergy = player.h.greenenergy.add(harvestspeed.mul(delta))
                player.h.slotgreenenergy[2] = player.h.slotgreenenergy[2].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotblueenergy[2].gt(1)) {
                player.h.blueenergy = player.h.blueenergy.add(harvestspeed.mul(delta))
                player.h.slotblueenergy[2] = player.h.slotblueenergy[2].sub(harvestspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[3].eq(5)) {
            if (player.h.slotredenergy[3].gt(1)) {
                player.h.redenergy = player.h.redenergy.add(harvestspeed.mul(delta))
                player.h.slotredenergy[3] = player.h.slotredenergy[3].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[3].gt(1)) {
                player.h.greenenergy = player.h.greenenergy.add(harvestspeed.mul(delta))
                player.h.slotgreenenergy[3] = player.h.slotgreenenergy[3].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotblueenergy[3].gt(1)) {
                player.h.blueenergy = player.h.blueenergy.add(harvestspeed.mul(delta))
                player.h.slotblueenergy[3] = player.h.slotblueenergy[3].sub(harvestspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[4].eq(5)) {
            if (player.h.slotredenergy[4].gt(1)) {
                player.h.redenergy = player.h.redenergy.add(harvestspeed.mul(delta))
                player.h.slotredenergy[4] = player.h.slotredenergy[4].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[4].gt(1)) {
                player.h.greenenergy = player.h.greenenergy.add(harvestspeed.mul(delta))
                player.h.slotgreenenergy[4] = player.h.slotgreenenergy[4].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotblueenergy[4].gt(1)) {
                player.h.blueenergy = player.h.blueenergy.add(harvestspeed.mul(delta))
                player.h.slotblueenergy[4] = player.h.slotblueenergy[4].sub(harvestspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[5].eq(5)) {
            if (player.h.slotredenergy[5].gt(1)) {
                player.h.redenergy = player.h.redenergy.add(harvestspeed.mul(delta))
                player.h.slotredenergy[5] = player.h.slotredenergy[5].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[5].gt(1)) {
                player.h.greenenergy = player.h.greenenergy.add(harvestspeed.mul(delta))
                player.h.slotgreenenergy[5] = player.h.slotgreenenergy[5].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotblueenergy[5].gt(1)) {
                player.h.blueenergy = player.h.blueenergy.add(harvestspeed.mul(delta))
                player.h.slotblueenergy[5] = player.h.slotblueenergy[5].sub(harvestspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[6].eq(5)) {
            if (player.h.slotredenergy[6].gt(1)) {
                player.h.redenergy = player.h.redenergy.add(harvestspeed.mul(delta))
                player.h.slotredenergy[6] = player.h.slotredenergy[6].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[6].gt(1)) {
                player.h.greenenergy = player.h.greenenergy.add(harvestspeed.mul(delta))
                player.h.slotgreenenergy[6] = player.h.slotgreenenergy[6].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotblueenergy[6].gt(1)) {
                player.h.blueenergy = player.h.blueenergy.add(harvestspeed.mul(delta))
                player.h.slotblueenergy[6] = player.h.slotblueenergy[6].sub(harvestspeed.mul(delta))
            }
        }
        if (player.h.slotstatus[7].eq(5)) {
            if (player.h.slotredenergy[7].gt(1)) {
                player.h.redenergy = player.h.redenergy.add(harvestspeed.mul(delta))
                player.h.slotredenergy[7] = player.h.slotredenergy[7].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotgreenenergy[7].gt(1)) {
                player.h.greenenergy = player.h.greenenergy.add(harvestspeed.mul(delta))
                player.h.slotgreenenergy[7] = player.h.slotgreenenergy[7].sub(harvestspeed.mul(delta))
            }
            if (player.h.slotblueenergy[7].gt(1)) {
                player.h.blueenergy = player.h.blueenergy.add(harvestspeed.mul(delta))
                player.h.slotblueenergy[7] = player.h.slotblueenergy[7].sub(harvestspeed.mul(delta))
            }
        }
        if (player.h.slotredenergy[1].lt(0)) {
            player.h.slotredenergy[1] = new Decimal(0)
        }
        if (player.h.slotgreenenergy[1].lt(0)) {
            player.h.slotgreenenergy[1] = new Decimal(0)
        }
        if (player.h.slotblueenergy[1].lt(0)) {
            player.h.slotblueenergy[1] = new Decimal(0)
        }
        if (player.h.slotredenergy[2].lt(0)) {
            player.h.slotredenergy[2] = new Decimal(0)
        }
        if (player.h.slotgreenenergy[2].lt(0)) {
            player.h.slotgreenenergy[2] = new Decimal(0)
        }
        if (player.h.slotblueenergy[2].lt(0)) {
            player.h.slotblueenergy[2] = new Decimal(0)
        }
        if (player.h.slotredenergy[3].lt(0)) {
            player.h.slotredenergy[3] = new Decimal(0)
        }
        if (player.h.slotgreenenergy[3].lt(0)) {
            player.h.slotgreenenergy[3] = new Decimal(0)
        }
        if (player.h.slotblueenergy[3].lt(0)) {
            player.h.slotblueenergy[3] = new Decimal(0)
        }
        if (player.h.slotredenergy[4].lt(0)) {
            player.h.slotredenergy[4] = new Decimal(0)
        }
        if (player.h.slotgreenenergy[4].lt(0)) {
            player.h.slotgreenenergy[4] = new Decimal(0)
        }
        if (player.h.slotblueenergy[4].lt(0)) {
            player.h.slotblueenergy[4] = new Decimal(0)
        }
        if (player.h.slotredenergy[5].lt(0)) {
            player.h.slotredenergy[5] = new Decimal(0)
        }
        if (player.h.slotgreenenergy[5].lt(0)) {
            player.h.slotgreenenergy[5] = new Decimal(0)
        }
        if (player.h.slotblueenergy[5].lt(0)) {
            player.h.slotblueenergy[5] = new Decimal(0)
        }
        if (player.h.slotredenergy[6].lt(0)) {
            player.h.slotredenergy[6] = new Decimal(0)
        }
        if (player.h.slotgreenenergy[6].lt(0)) {
            player.h.slotgreenenergy[6] = new Decimal(0)
        }
        if (player.h.slotblueenergy[6].lt(0)) {
            player.h.slotblueenergy[6] = new Decimal(0)
        }
        if (player.h.slotredenergy[7].lt(0)) {
            player.h.slotredenergy[7] = new Decimal(0)
        }
        if (player.h.slotgreenenergy[7].lt(0)) {
            player.h.slotgreenenergy[7] = new Decimal(0)
        }
        if (player.h.slotblueenergy[7].lt(0)) {
            player.h.slotblueenergy[7] = new Decimal(0)
        }

        //aarex energy

        let totalenergy = new Decimal(0)
        totalenergy = player.h.redenergy.add(player.h.greenenergy.add(player.h.blueenergy))
        player.h.aarexianenergytoget = totalenergy.pow(0.2)
        player.h.aarexianenergytoget = player.h.aarexianenergytoget.mul(buyableEffect("h", 41))

        player.h.aarexianenergyeffect = player.h.aarexianenergy.pow(0.8).add(1)

        if (hasUpgrade("h", 33)) player.h.aarexianenergy = player.h.aarexianenergy.add(player.h.aarexianenergytoget.mul(delta))

        //jacorb shrine

        player.h.jacorbshrinepowereffect = player.h.jacorbshrinepower.mul(0.01).pow(0.8).add(1)

        player.h.jacorbshrinepower = player.h.buyables[37].add(player.h.buyables[38].add(player.h.buyables[39].add(player.h.buyables[41].add(player.h.buyables[42].add(player.h.buyables[43])))))
    },
    milestones: {
        11: {
            requirementDescription: "3 Potential",
            done() { return player.h.potential.gte(3) },
            effectDescription: "Gain 50% of prestige power per second.",
        },
    },
    microtabs: {
        stuff: {
            "Lore": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["microtabs", "lore", { 'border-width': '0px' }],
                    ]

            },
            "Potential": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You specifically have " + format(player.h.potential, 6) + " potential." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Willpower: " + format(player.h.willpowereffect) + " Potential." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.h.prestigepowerunlock.eq(1) ? "Prestige Power: " + format(player.h.prestigepowereffect) + " Potential." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Milestones" }],
                        ["milestone", 11],
                    ]

            },
            "Willpower": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["microtabs", "willpower", { 'border-width': '0px' }],
                    ]

            },
            "Meta-Prestige": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["microtabs", "metaprestige", { 'border-width': '0px' }],
                    ]

            },
        },
        willpower:
        {
            "Main": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.willpower) + " willpower." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You are gaining " + format(player.h.willpowerpersecond) + " willpower per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["buyable", 11], ["buyable", 16]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Upgrades" }],
                        ["blank", "25px"],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ]

            },
            "Shrines": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["microtabs", "shrines", { 'border-width': '0px' }],
                    ]

            },
            "Prestige Power": {
                unlocked() { return hasUpgrade("h", 16) },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["microtabs", "prestigepower", { 'border-width': '0px' }],
                    ]

            },
        },
        prestigepower:
        {
            "Main": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.willpower) + " willpower." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You are gaining " + format(player.h.willpowerpersecond) + " willpower per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have " + format(player.h.prestigepower, 0) + " prestige power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Your prestige power gives a x" + format(player.h.prestigepowereffect2, 2) + " boost to willpower." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 12]]],
                        ["row", [["clickable", 13]]],
                        ["blank", "25px"],
                        ["row", [["upgrade", 21], ["upgrade", 25], ["upgrade", 26], ["upgrade", 28], ["upgrade", 33], ["upgrade", 34]]],
                    ]

            },
            "Trigonometry Boosters": {
                unlocked() { return player.h.prestigepowerunlock.eq(1) },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.willpower) + " willpower." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.prestigepower, 0) + " prestige power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 27]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return hasUpgrade("h", 17) ? "Cosine: x" + format(player.h.cosinebooster) + " boost to willpower." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return hasUpgrade("h", 18) ? "Tangent: x" + format(player.h.tangentbooster) + " boost to willpower." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return hasUpgrade("h", 19) ? "Sine: x" + format(player.h.sinebooster) + " boost to willpower." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 28], ["clickable", 29], ["clickable", 31]]],
                    ]

            },
            "Assembly Line": {
                unlocked() { return hasUpgrade("h", 21) },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["microtabs", "assemblyline", { 'border-width': '0px' }],
                    ]

            },
            "Aarexian Energy": {
                unlocked() { return hasUpgrade("h", 28) },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.redenergy) + " red energy." }, { "color": "red", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.greenenergy) + " green energy." }, { "color": "green", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.blueenergy) + " blue energy." }, { "color": "blue", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have " + format(player.h.aarexianenergy) + " aarexian energy, which give a " + format(player.h.aarexianenergyeffect) + "x boost to assembly line speed." }, { "color": "#68e8f4", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You will gain " + format(player.h.aarexianenergytoget) + " aarexian energy." }, { "color": "#68e8f4", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 32]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>Upgrades" }],
                        ["blank", "25px"],
                        ["row", [["upgrade", 29], ["upgrade", 31], ["upgrade", 32]]],
                    ]

            },
        },
        assemblyline:
        {
            "Main": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.willpower) + " willpower." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.prestigepower, 0) + " prestige power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have " + format(player.h.redenergy) + " red energy." }, { "color": "red", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.greenenergy) + " green energy." }, { "color": "green", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.blueenergy) + " blue energy." }, { "color": "blue", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You are picking for slot " + format(player.h.assemblylineselect, 0) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.h.slotstatuspic[1] + player.h.slotstatuspic[2] + player.h.slotstatuspic[3] + player.h.slotstatuspic[4] + player.h.slotstatuspic[5] + player.h.slotstatuspic[6] + player.h.slotstatuspic[7] }],
                        ["row", [["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19], ["clickable", 21]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "R1: " + format(player.h.slotredenergy[1], 0) + " R2: " + format(player.h.slotredenergy[2], 0) + " R3: " + format(player.h.slotredenergy[3], 0) + " R4: " + format(player.h.slotredenergy[4], 0) + " R5: " + format(player.h.slotredenergy[5], 0) + " R6: " + format(player.h.slotredenergy[6], 0) + " R7: " + format(player.h.slotredenergy[7], 0) }, { "color": "red", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "G1: " + format(player.h.slotgreenenergy[1], 0) + " G2: " + format(player.h.slotgreenenergy[2], 0) + " G3: " + format(player.h.slotgreenenergy[3], 0) + " G4: " + format(player.h.slotgreenenergy[4], 0) + " G5: " + format(player.h.slotgreenenergy[5], 0) + " G6: " + format(player.h.slotgreenenergy[6], 0) + " G7: " + format(player.h.slotgreenenergy[7], 0) }, { "color": "green", "font-size": "18px", "font-family": "monospace" }],
                        ["raw-html", function () { return "B1: " + format(player.h.slotblueenergy[1], 0) + " B2: " + format(player.h.slotblueenergy[2], 0) + " B3: " + format(player.h.slotblueenergy[3], 0) + " B4: " + format(player.h.slotblueenergy[4], 0) + " B5: " + format(player.h.slotblueenergy[5], 0) + " B6: " + format(player.h.slotblueenergy[6], 0) + " B7: " + format(player.h.slotblueenergy[7], 0) }, { "color": "blue", "font-size": "18px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 23], ["clickable", 24], ["clickable", 25], ["clickable", 26], ["clickable", 27]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.h.assemblylinetypeselect.eq(1) ? "<h2>Produces red energy " : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.h.assemblylinetypeselect.eq(2) ? "<h2>Produces green energy " : "" }, { "color": "green", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.h.assemblylinetypeselect.eq(3) ? "<h2>Produces blue energy " : "" }, { "color": "blue", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.h.assemblylinetypeselect.eq(4) ? "<h2>Transports energy across the line " : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.h.assemblylinetypeselect.eq(5) ? "<h2>Harvests the energy in the line " : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ]

            },
            "Buyables and Upgrades": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.willpower) + " willpower." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.prestigepower, 0) + " prestige power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have " + format(player.h.redenergy) + " red energy." }, { "color": "red", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.greenenergy) + " green energy." }, { "color": "green", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.blueenergy) + " blue energy." }, { "color": "blue", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.h.slotstatuspic[1] + player.h.slotstatuspic[2] + player.h.slotstatuspic[3] + player.h.slotstatuspic[4] + player.h.slotstatuspic[5] + player.h.slotstatuspic[6] + player.h.slotstatuspic[7] }],
                        ["blank", "25px"],
                        ["row", [["buyable", 19], ["buyable", 21], ["buyable", 22]]],
                        ["blank", "25px"],
                        ["row", [["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                    ]

            },
        },
        metaprestige:
        {
            "Main": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["row", [["clickable", 11]]],
                    ]

            },
        },
        shrines:
        {
            "Chapter 1": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["microtabs", "chapter1shrines", { 'border-width': '0px' }],
                    ]

            },
        },
        lore:
        {
            "Chapter 1": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["microtabs", "chapter1lore", { 'border-width': '0px' }],
                    ]

            },
        },
        chapter1lore:
        {
            "Beginning": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "<h2> Since the beginning of time,  " }],
                        ["raw-html", function () { return "<h2> The multiverse has lived in peace, without conflict or war.  "}],
                        ["raw-html", function () { return "<h2> All entities lived in harmony.  " }],
                        ["raw-html", function () { return "<h2> But one day, an unknown entity split the multiverse into six realms:  " }],
                        ["raw-html", function () { return "<img src='resources/cutscene1.png'</img>"  }],
                        ["raw-html", function () { return "<h2> The creator realm, the higher plane of existence, the death realm,  " }],
                        ["raw-html", function () { return "<h2> the dimensional realm, the backrooms, and the void.  "}],
                        ["raw-html", function () { return "<h2> The split caused confusion among the multiverse. "}],
                        ["raw-html", function () { return "<h2> Many people lost their lives.  "}],
                        ["raw-html", function () { return "<img src='resources/cutscene2.png'</img>"}],
                        ["raw-html", function () { return "<h2>Over time, many new lifeforms evolved in these realms. " }],
                        ["raw-html", function () { return "<img src='resources/cutscene3.png'</img>" }],
                        ["raw-html", function () { return "<h2>However, the creator realm was the most interesting realm. " }],
                        ["raw-html", function () { return "<h2>No supernatural entities live there, only humans. "   }],
                        ["raw-html", function () { return "<h2>Most humans in the creator realm aren't aware of other realms' existence. "   }],
                        ["raw-html", function () { return "<img src='resources/cutscene4.png'</img>"   }],
                        ["raw-html", function () { return "<h2>But humans can affect the other realms using their imagination. "   }],
                        ["raw-html", function () { return "<h2>The other five realms started to form different beliefs. "   }],
                        ["raw-html", function () { return "<h2>Eventually, a very long five-way multiversal war begun. "   }],
                        ["raw-html", function () { return "<img src='resources/cutscene5.png'</img>"   }],
                        ["raw-html", function () { return "<h2>The higher plane of existence had won this war. "   }],
                        ["raw-html", function () { return "<h2>They took control of the other 4 realms. "   }],
                        ["raw-html", function () { return "<h2>They became the highest class of the multiverse."   }],
                        ["raw-html", function () { return "<img src='resources/cutscene6.png'</img>"   }],
                        ["raw-html", function () { return "<h2>You live in the dimensional realm, which consists of many dimensions."   }],
                        ["raw-html", function () { return "<h2>You live here specifically."   }],
                        ["raw-html", function () { return "<img src='resources/cutscene7.png'</img>"   }],
                        ["raw-html", function () { return "<h2>You are a high school dropout who does nothing but watch tv and play games all day."   }],
                        ["raw-html", function () { return "<img src='resources/cutscene8.png'</img>"   }],
                        ["raw-html", function () { return "<h2>You were playing games until someone came knocking on your door."   }],
                        ["raw-html", function () { return "<img src='resources/cutscene9.png'</img>"   }],
                        ["raw-html", function () { return "<h2>Nah. Bro looked like he came staight out of BFDI."   }],
                        ["raw-html", function () { return "<h2>The quadrilateral introduced himself."   }],
                        ["raw-html", function () { return "<h2>Red Diamond: Hi. I am Red Diamond."   }],
                        ["raw-html", function () { return "<h2>Red Diamond: I come from the higher plane of existence."   }],
                        ["raw-html", function () { return "<h2>You: Very nice costume."   }],
                        ["raw-html", function () { return "<h2>You take another look and realize it's actually some diamond dude."   }],
                        ["raw-html", function () { return "<h2>You thought you took shrooms but you actually didn't."   }],
                        ["raw-html", function () { return "<h2>Red Diamond: I believe you are THE CHOSEN ONE for the ANCIENT PROPHECY."   }],
                        ["raw-html", function () { return "<h2>You: What prophecy?"   }],
                        ["raw-html", function () { return "<h2>Red Diamond: A loyal hero will REUNITE THE REALMS."   }],
                        ["raw-html", function () { return "<img src='resources/cutscene10.png'</img>"   }],
                        ["raw-html", function () { return "<h2>Red Diamond: I believe it will be you."   }],
                        ["raw-html", function () { return "<h2>Red Diamond proceeded to bend the reality around you."   }],
                        ["raw-html", function () { return "<h2>You: What the hell are you doing?!"   }],
                        ["raw-html", function () { return "<img src='resources/cutscene11.png'</img>"   }],
                        ["raw-html", function () { return "<h2>He explained everything about the realms, the war, and the split."   }],
                        ["raw-html", function () { return "<h2>You eventually gain understanding about what he's saying."   }],
                        ["raw-html", function () { return "<h2>Red Diamond: Before you become a god, you must start small. Start with the TREES."   }],
                        ["raw-html", function () { return "<h2>Everything goes away and you wake up on your floor. You check your phone."   }],
                        ["raw-html", function () { return "<img src='resources/cutscene12.png'</img>"   }],
                        ["raw-html", function () { return "<h1>YOU KNOW WHAT TO DO NOW"   }],
                    ]

            },
            "Incremental": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>A long time has passed since the war. The higher plane of existence and the death realms made an alliance." }],
                        ["raw-html", function () { return "<h3>The backrooms and void have made an alliance, but are still against the higher plane and death realms." }],
                        ["raw-html", function () { return "<h3>In order to gain the dimensional realm, the backrooms and void used their own energy to create four legendary nobles." }],
                        ["raw-html", function () { return "<h3>They were the incremental nobles. They had power of gods and the minds of prodigies." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h2>The knight of upgrades. The ranger of numbers." }],
                        ["raw-html", function () { return "<h2>The mage of automation. The warrior of infinity." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Each of the nobles has made great contributions to the backrooms and the void." }],
                        ["raw-html", function () { return "<h3>They helped increase the limit of backrooms levels the backrooms could make." }],
                        ["raw-html", function () { return "<h3>They also extracted power from darkness, and made a POWERFUL WEAPON with most of the energy from the void." }],
                        ["raw-html", function () { return "<h3>This weapon was so powerful, it could beat THE MULTIVERSAL SPLITTER." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>But one day, the higher plane saw their weapon and wanted to join them." }],
                        ["raw-html", function () { return "<h3>The void and backrooms were unsure, but the death realm was mad at the higher plane." }],
                        ["raw-html", function () { return "<h3>The death realm and higher plane cut ties with each other." }],
                        ["raw-html", function () { return "<h3>The gods from the death realm searched for the incremental nobles." }],
                        ["raw-html", function () { return "<h3>They fought in another long war, in order for justice to be made." }],
                        ["raw-html", function () { return "<h3>The death realm won, and three of the four nobles were exiled." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>The warrior of infinity changed his identity. He changed his name to Hevipelle." }],
                        ["raw-html", function () { return "<h3>He revolutionized incrementals. He formed a lot of powerful beings known as celestials." }],
                        ["raw-html", function () { return "<h3>To free the other nobles, Hevipelle used his antimatter dimensions to fight back against the death realm." }],
                        ["raw-html", function () { return "<h3>But it was no use. The death realm was all powerful." }],
                        ["raw-html", function () { return "<h3>The higher plane joined the backrooms and the void, to bring back the exiled nobles and to bring the weapon back." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h2>YOU WILL USE THE WEAPON." }],
                        ["raw-html", function () { return "<img src='resources/storyofincremental.png'</img>" }],
                    ]

            },
            "Antimatter Dimensions": {
                unlocked() { return player.i.singularityunlocked.eq(1) },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return '<h2>All of this "realm" stuff is nonsense.' }],
                        ["raw-html", function () { return '<h2>The true story lies within the micro, not the macro.' }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>In the beginning, there was only matter." }],
                        ["raw-html", function () { return "<h3>Matter made up everything. It was a very great thing." }],
                        ["raw-html", function () { return "<h3>All universes in the dimensional realm were made of this matter." }],
                        ["raw-html", function () { return "<h3>Until one day, Hevipelle brought antimatter to the multiverse." }],
                        ["raw-html", function () { return "<h3>He converted many dimensions into antimatter in order to fight the death realm." }],
                        ["raw-html", function () { return "<h3>He realized the damage he done. He quit." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>He started a more calm lifestyle." }],
                        ["raw-html", function () { return "<h3>He started treating his celestials as children." }],
                        ["raw-html", function () { return "<h3>Many of them left, but seven stayed with him." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Teresa, Effarig, The Nameless Ones, V." }],
                        ["raw-html", function () { return "<h3>Ra, Lai'tela, and Pelle." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Pelle was the eldest, and the one who was the most close to Hevipelle." }],
                        ["raw-html", function () { return "<h3>However, he started acting rather strange. He spoke strange." }],
                        ["raw-html", function () { return '<h3>He spoke many about a "destroyer".'  }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Everyone was confused by Pelle's words." }],
                        ["raw-html", function () { return "<h3>One of them, Ra was so confused they lost all their memories of the others." }],
                        ["raw-html", function () { return "<h3>That's also how The Nameless Ones lost their names." }],
                        ["raw-html", function () { return "<h3>However, Hevipelle knew something bad was coming." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>He put Teresa to do very intensive research." }],
                        ["raw-html", function () { return "<h3>Instead of going the usual route of quantum and ghosts," }],
                        ["raw-html", function () { return "<h3>Teresa found a new layer. Reality." }],
                        ["raw-html", function () { return "<h3>Reality machines are very powerful, and can cause lots of destruction." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Hevipelle put Effarig to find the glyphs forgotten by the time before the realms." }],
                        ["raw-html", function () { return "<h3>He found a lot of them. He manipulated them in a way to improve antimatter production." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Hevipelle put The Nameless Ones to manipulate time and find methods for doing so." }],
                        ["raw-html", function () { return "<h3>Turns out, you can store time in black holes, even from the creator realm." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>V, who had power in ego, made his way achieving as much as possible." }],
                        ["raw-html", function () { return "<h3>He had created the infamous V achievements." }],
                        ["raw-html", function () { return "<h3>Only the most powerful can get past them." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Despite being very forgetful, Ra tried to help as well." }],
                        ["raw-html", function () { return "<h3>Ra supported the other celestials, like finding new glyphs and studies." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Hevipelle asked Lai'tela to research from other paths," }],
                        ["raw-html", function () { return "<h3>Manipulating the power of dark matter and energy." }],
                        ["raw-html", function () { return "<h3>Using singularities, similar to you." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>And finally, Pelle." }],
                        ["raw-html", function () { return "<h3>Hevipelle put Pelle in control of everything." }],
                        ["raw-html", function () { return "<h3>He trusted Pelle." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Each celestial had its own reality, to hinder the destroyer." }],
                        ["raw-html", function () { return "<h3>They were prepared, and anticipated until the day came." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<img src='resources/hevi.png'</img>" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h2>The destroyer was here." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>It grew fast, and stronger." }],
                        ["raw-html", function () { return "<h3>Eventually, it got hold of reality machines." }],
                        ["raw-html", function () { return "<h3>Teresa knew the destroyer was here." }],
                        ["raw-html", function () { return "<h3>But she could only sit and watch." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>When it arrived, Teresa tried being friendly." }],
                        ["raw-html", function () { return "<h3>She offered the destroyer to join the celestials." }],
                        ["raw-html", function () { return "<h3>However, the destroyer kept on growing." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Its power was no match to the celestials." }],
                        ["raw-html", function () { return "<h3>Its power in antimatter only grew and grew." }],
                        ["raw-html", function () { return "<h3>Infinity, eternity, reality. All in it's control." }],
                        ["raw-html", function () { return "<h3>Each one fell down, one by one." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>In fear, Lai'Tela banished Ra." }],
                        ["raw-html", function () { return "<h3>Ra's powers corrupted, and actually helped the destroyer." }],
                        ["raw-html", function () { return "<h3>Its manipulation was never seen before." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Hevipelle watched, as all of his children fell." }],
                        ["raw-html", function () { return "<h3>In grief, he locked himself away in the void." }],
                        ["raw-html", function () { return "<h3>Never to be seen again, giving the destroyer this very nickname." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h1>The infinity keeper." }],
                    ]

            },
            "Distance Incremental": {
                unlocked() { return hasUpgrade("i", 172) },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["blank", "25px"],
                        ["raw-html", function () { return '<h3>"There once was a boy who ran far, far away.' }],
                        ["raw-html", function () { return '<h3>He gained power, and strength along the way.' }],
                        ["blank", "25px"],
                        ["raw-html", function () { return '<h3>When the boy returned, he was more than a man.' }],
                        ["raw-html", function () { return '<h3>He was a high god. And if he wants to ascend higher, he can."' }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Even before the times of the nobles, the power of incremental still existed in the multiverse." }],
                        ["raw-html", function () { return "<h3>All paths still existed, but functioned in different ways." }],
                        ["raw-html", function () { return "<h3>People still used the power to do many things." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>In a region of the dimensional realm, six beings collaborated and studied this power." }],
                        ["raw-html", function () { return "<h3>They discovered many things. The power of infinity, eternity. Even reality." }],
                        ["raw-html", function () { return "<h3>They experimented and experimented. Eventually, they harnessed the great power and became high gods." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Infinity, Eternity, Reality, Spaceon, Solaris, Drigganiz." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>They laid dormant, until they found a being worthy of true high god power." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>One day, a young Jacorb encountered them." }],
                        ["raw-html", function () { return "<h3>He was on a very long journey across the dimensional realm." }],
                        ["raw-html", function () { return "<h3>He showed great power in bending the laws of physics, which impressed the high gods." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>They turned him into a god on Jacorb's tenth infinity." }],
                        ["raw-html", function () { return "<h3>He kept on going and never stopped. He became an incremental noble after he got softcapped." }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Now, the high gods seemingly vanished. You must find them to free Jacorb from exile." }],
                        ["raw-html", function () { return "<h3>They need your help. Jacorb needs your help." }],
                        ["raw-html", function () { return "<h3>Do the right thing, okay?" }],
                    ]

            },
        },
        chapter1shrines:
        {
            "Infinity": {
                unlocked() { return true },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.willpower) + " willpower." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.shrinepower) + " shrine power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h2>Your shrine power give a x" + format(player.h.shrinepowereffect) + "<h2> boost to willpower gain. " }],
                        ["row", [["buyable", 12], ["buyable", 13], ["buyable", 14], ["buyable", 15]]],
                        ["row", [["buyable", 17], ["buyable", 18]]],
                    ]

            },
            "Singularity": {
                unlocked() { return player.i.singularityunlocked.eq(1) },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.prestigepower) + " prestige power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.shrinepower) + " shrine power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h2>Your shrine power give a x" + format(player.h.shrinepowereffect) + "<h2> boost to willpower gain. " }],
                        ["row", [["buyable", 23], ["buyable", 24], ["buyable", 25], ["buyable", 26]]],
                        ["row", [["buyable", 27], ["buyable", 28], ["buyable", 29], ["buyable", 31]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>These are worth double shrine power.</h3>" }],
                    ]

            },
            "Omega": {
                unlocked() { return hasUpgrade("h", 31) },
                buttonStyle() { return { 'color': '#68e8f4' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.h.aarexianenergy) + " aarexian energy." }, { "color": "#68e8f4", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.shrinepower) + " shrine power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h2>Your shrine power give a x" + format(player.h.shrinepowereffect) + "<h2> boost to willpower gain. " }],
                        ["row", [["buyable", 32], ["buyable", 33], ["buyable", 34], ["buyable", 35]]],
                        ["row", [["buyable", 36]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>These are worth x5 shrine power.</h3>" }],
                    ]

            },
            "Jacorbian": {
                unlocked() { return hasUpgrade("h", 34) },
                buttonStyle() { return { 'color': 'purple' } },
                content:
                    [
                        ["raw-html", function () { return "You have " + format(player.j.jacorbtokens) + " jacorb tokens." }, { "color": "purple", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have " + format(player.h.jacorbshrinepower) + " jacorbian shrine power." }, { "color": "purple", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "Your jacorbian shrine power give a x" + format(player.h.jacorbshrinepowereffect) + " boost to jacorb token gain. " }, { "color": "purple", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["buyable", 37], ["buyable", 38], ["buyable", 39], ["buyable", 41]]],
                        ["row", [["buyable", 42], ["buyable", 43]]],
                    ]

            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have " + format(player.h.potential, 0) + " potential." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
        //MUSIC CONTROL
        ["raw-html", function () { return options.musicToggle ? "<audio controls autoplay loop hidden><source src=music/hub.mp3 type<=audio/mp3>loop=true hidden=true autostart=true</audio>" : "" }],
    ],
    layerShown() { return hasUpgrade("i", 66) || player.i.singularityunlocked.eq(1) }
})
