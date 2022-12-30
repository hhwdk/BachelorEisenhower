<template>
    <main class="ih-container px-28" id="ih-container">
        <!--     <section id="maintasks">
    test
        </section> -->

        <div class="flex justify-between">
            <div class="boundingbox" id="boundingbox">
                <div id="box1" ref="box" @click.self="createTask">
                    <div
                        v-for="item in points"
                        :key="item.id"
                        :id="item.id"
                        class="point"
                    ></div>
                </div>
            </div>
            <div class="flex flex-col pl-8">
                <div class="">
                    <div class="border p-2">
                        <h2 class="font-sans font-bold text-4xl">DO IT</h2>
                        <div v-for="item in points" :key="item.id">
                            {{ item.titel }}
                        </div>
                    </div>
                    <div class="border p-2">
                        <h2 class="font-sans font-bold text-4xl">
                            SCHEDULE IT
                        </h2>
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
        </div>
        <label id="lbl1"></label>
    </main>
</template>

<style>
.box {
    position: absolute;
}

.box input {
    @apply block w-auto mx-2 left-full relative px-3 py-1.5 text-base font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none;
}

.inputs {
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
    width: 1000px;
    @apply mr-auto border  relative;
}

#clickme {
    margin-top: 20px;
    margin-left: 100px;
    border: 1px solid black;
    cursor: pointer;
}
.point {
    width: 25px;
    height: 25px;
    background: rgb(237, 14, 14);
    position: absolute;
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

.highlight {
    border: 4px solid yellow;
    width: 196px;
    height: 76px;
    line-height: 76px;
}
.modal-content {
    display: flex;
    flex-direction: column;
}
.modal-content input {
    @apply block w-auto relative my-2 px-3 py-1.5 text-base font-normal
        text-gray-700 border border-solid border-gray-500 rounded;
    left: 0;
}
.modal-content button {
    @apply block w-auto relative my-2 px-3 py-1.5 text-base font-normal
        text-gray-700 border border-solid border-gray-500 rounded;
    left: 0;
}

.point {
    width: 25px;
    height: 25px;
    background: rgb(237, 14, 14);
    position: absolute;
}

h4 {
    @apply text-3xl font-bold font-sans mb-2;
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
const updatePosition = async ({ id, x, y, title, date }) => {
    await useFetch('http://localhost:5000/', {
        method: 'put',
        body: { id: id, x: x, y: y, titel: title, date: date },
    });
    console.log(x, y, id);
};

const addPosition = async ({ x, y }) => {
    await useFetch('http://localhost:5000/', {
        method: 'post',
        body: { x: x, y: y },
    });
    console.log(x);
};
const createTask = (event) => {
    const l1 = document.getElementById('lbl1');
    const b1 = document.createElement('div');
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; //x position within the element.
    const y = event.clientY - rect.top; //y position within the element.
    const xPosition = Math.round(x / 50) * 50;
    const yPosition = Math.round(y / 50) * 50;
    console.dir('works not' + event);

    document.getElementById('box1').appendChild(b1);
    b1.style.left = x + 'px';
    b1.style.top = y + 'px';
    b1.setAttribute('id', xPosition);
    l1.innerHTML = 'Left? : ' + x + ' ; Top? : ' + Math.round(y) + '.';

    b1.className = 'point';

    const box1 = document.getElementById('box1');

    Draggable.create(b1, console.log({ b1 }), {
        bounds: '#box1',
        force3D: false,
        /* liveSnap: true,

        snap: {
            x: (endValue) => Math.round(endValue / gridWidth) * gridWidth,
            y: (endValue) => Math.round(endValue / gridHeight) * gridHeight,
        }, */
    });
    addPosition({ x: x, y: y });
};

onMounted(() => {
    gsap.registerPlugin(Draggable);

    const container = document.getElementById('box1');
    const gridHeight = 50;
    const gridWidth = 50;
    const gridRows = container.getBoundingClientRect().height / gridHeight;
    const gridColumns = Math.floor(container.clientWidth / gridWidth);

    /* document.getElementById('box1').addEventListener('click', function (event) {
        //;
           const modal = document.createElement("div");
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
 
        //document.getElementById("boundingbox").appendChild(modalOverlay);
    });*/

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
        const dateformat = point.date.split('T')[0];
        gsap.set(box.value.children[index], { x: point.X, y: point.Y });

        Draggable.create(box.value.children[index], {
            bounds: '#box1',
            liveSnap: true,
            onDragEnd: function () {
                updatePosition({
                    id: point.id,
                    x: Math.round(this.endX),
                    y: Math.round(this.endY),
                    title: point.titel,
                    date: dateformat,
                });
            },

            onClick: function createModal(end) {
                // Create modal element
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.style.display = 'block';
                modal.style.position = 'fixed';
                modal.style.zIndex = '100';
                modal.style.left = '0';
                modal.style.top = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.overflow = 'auto';
                modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

                // Create modal content container
                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-content');
                modalContent.style.backgroundColor = '#e6e6e6';
                modalContent.style.margin = '15% auto';
                modalContent.style.padding = '2rem';
                modalContent.style.border = '1px solid #888';
                modalContent.style.display = 'flex';
                modalContent.style.width = '33%';

                const title = document.createElement('h4');
                title.textContent = 'Edit task';

                // Create title input
                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.name = 'title';
                titleInput.id = 'title';
                titleInput.value = point.titel;

                // Create due date input
                const dueDateInput = document.createElement('input');
                dueDateInput.type = 'date';
                dueDateInput.name = 'duedate';
                dueDateInput.id = 'duedate';

                dueDateInput.value = point.date.split('T')[0];

                const sendButton = document.createElement('input');
                sendButton.type = 'button';
                sendButton.value = 'Send';

                modalContent.appendChild(title);
                modalContent.appendChild(titleInput);
                modalContent.appendChild(dueDateInput);
                modalContent.appendChild(sendButton);

                modal.appendChild(modalContent);

                document.body.appendChild(modal);
                sendButton.addEventListener('click', () => {
                    modal.remove();
                    updatePosition({
                        id: point.id,
                        x: end.x,
                        y: end.y,
                        title: titleInput.value,
                        date: dueDateInput.value,
                    });
                });
                modal.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.remove();
                    }
                });
            },
            snap: {
                x: (endValue) => Math.round(endValue / gridWidth) * gridWidth,
                y: (endValue) => Math.round(endValue / gridHeight) * gridHeight,
            },
        });
    });
});
</script>
