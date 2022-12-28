<template>
    <main class="ih-container px-28" id="ih-container">
        <!--     <section id="maintasks">
    test
        </section> -->
        <button class="button" @click="modalClick = !modalClick">ree</button>

        <h2 v-show="modalClick">test</h2>
        <div class="flex justify-between">
            <div class="boundingbox" id="boundingbox">
                <div id="box1" ref="box">
                    <div
                        v-for="item in points"
                        :key="item.id"
                        :id="item.id"
                        class="bubble box"
                        :style="{ left: item.X + 'px', top: item.Y + 'px' }"
                    ></div>
                </div>
            </div>
            <div class="pl-8 grow">
                <div class="border p-2">
                    <h2 class="font-sans font-bold text-4xl">DO IT</h2>
                    <div v-for="item in points" :key="item.id">
                        {{ item.titel }}
                    </div>
                </div>
                <div class="border p-2">
                    <h2 class="font-sans font-bold text-4xl">SCHEDULE IT</h2>
                    <div v-for="item in points" :key="item.id">
                        {{ item.titel }}
                    </div>
                </div>
                <div class="border p-2">
                    <h2>DELEGATE IT</h2>
                    <div v-for="item in points" :key="item.id">
                        {{ item.titel }}
                    </div>
                </div>
            </div>
        </div>
        <label id="lbl1"></label>
    </main>
</template>

<style>
.box {
    position: absolute;
}

.button {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}

.modal {
    position: relative;
    outline: 1px solid red;
    left: 20px;
    width: 200px;
    height: 200px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: none;
}

.modal-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
}

#maintasks {
    width: 200px;
    outline: solid red 2px;
    height: 200px;
}

.ih-container {
    position: relative;
}

.boundingbox {
    height: 700px;
    @apply mr-auto border w-2/3 relative;
}

#clickme {
    margin-top: 20px;
    margin-left: 100px;
    border: 1px solid black;
    cursor: pointer;
}

.bubble {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: orange;
    border-radius: 50%;
}

#box1 {
    width: 100%;
    height: 100%;
    position: relative;

    /*  border: 1px solid #000;
  box-shadow: inset 0 0 100px #eee; */
    /*   background-image:
    repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
  background-size: 5% 5%; */
}

.box {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: rgb(237, 14, 14);

    position: absolute;
    top: 0;
}

.highlight {
    border: 4px solid yellow;
    width: 196px;
    height: 76px;
    line-height: 76px;
}
</style>

<script setup>
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

const modalClick = ref(false);
const box = ref(null);

const { data: points } = await useFetch('http://localhost:5000/', {
    method: 'get',
});
const updatePosition = async ({ id, x, y }) => {
    await useFetch('http://localhost:5000/', {
        method: 'put',
        body: { id: id, x: x, y: y },
    });
    console.log(x, y, id);
};

const addPosition = async ({ x }) => {
    await useFetch('http://localhost:5000/', {
        method: 'post',
        body: { x: x },
    });
    console.log(x);
};

onMounted(() => {
    gsap.registerPlugin(Draggable);

    const container = document.getElementById('box1');
    const gridHeight = 50;
    const gridWidth = 50;
    const gridRows = container.getBoundingClientRect().height / gridHeight;
    const gridColumns = Math.floor(container.clientWidth / gridWidth);

    document.getElementById('box1').addEventListener('click', function (event) {
        const l1 = document.getElementById('lbl1');

        const b1 = document.createElement('div');
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left; //x position within the element.
        const y = event.clientY - rect.top; //y position within the element.
        const xPosition = Math.round(x / 50) * 50;
        const yPosition = Math.round(y / 50) * 50;
        document.getElementById('box1').appendChild(b1);
        b1.style.left = xPosition + 'px';
        b1.style.top = yPosition + 'px';
        b1.setAttribute('id', xPosition);
        l1.innerHTML = 'Left? : ' + x + ' ; Top? : ' + Math.round(y) + '.';

        b1.className = 'bubble box';

        const box1 = document.getElementById('box1');

        Draggable.create(b1, console.log({ b1 }), {
            type: 'x,y',
            edgeResistance: 0.865,
            bounds: box1,

            liveSnap: true,

            snap: {
                x: (endValue) => Math.round(endValue / gridWidth) * gridWidth,
                y: (endValue) => Math.round(endValue / gridHeight) * gridHeight,
            },
        });

        addPosition({ x: x });

        /*   const modal = document.createElement("div");
        b1.appendChild(modal)
        //testArray.push(document.getElementById(xPosition))
        //console.log(testArray)

           Draggable.update( {
            onRelease: console.timeLog()
          })

        const modalOverlay = document.createElement("div");

        const modalSelector = document.querySelector("modal");
        const modalOverlaySelector = document.getElementById("Overlay");

        modalOverlay.classList.add("modal-overlay");
        modalOverlay.setAttribute('id', "Overlay")
        modal.classList.add("modal");
 */
        //document.getElementById("boundingbox").appendChild(modalOverlay);
    });

    /*   for (i = 0; i < gridRows * gridColumns; i++) {
        y = Math.floor(i / gridColumns) * gridHeight;
        x = (i * gridWidth) % (gridColumns * gridWidth);

        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.border = '1px solid #454545';
        div.style.width = `${gridWidth}px`;
        div.style.height = `${gridHeight}px`;
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        div.style.zIndex = "-2000"
        //container.prepend(div);
    }  */

    points.value.forEach((point, index) => {
        console.dir(box.value.children);
        console.log(index);

        Draggable.create(box.value.children[index], {
            type: 'x,y',
            x: point.X,
            y: point.Y,
            bounds: '#box1',
            liveSnap: true,
            onDragEnd: (end) => {
                updatePosition({ id: point.id, x: end.x, y: end.y });
            },
            snap: {
                x: (endValue) => Math.round(endValue / gridWidth) * gridWidth,
                y: (endValue) => Math.round(endValue / gridHeight) * gridHeight,
            },
        });
    });
});
</script>
