import ServerController from "./ServerController";
import * as tf from '@tensorflow/tfjs-node'
// new ServerController().initServer()


async function tr(){
    let model:tf.Sequential | tf.LayersModel;
    let model_name = "xor"

    try{
        model = await tf.loadLayersModel('file://./temp/'+model_name+'/model.json');
    }
    catch(e){
        model = tf.sequential({
            layers: [
              tf.layers.dense({inputShape: [2], units: 3, activation: 'sigmoid'}),
              tf.layers.dense({units: 1, activation: 'sigmoid', inputShape: [3]}),
            ]
        });
    }
    
    model.compile({loss: 'meanSquaredError', optimizer: 'rmsprop'});
    
    

    const training_data = tf.tensor2d([[0,0],[0,1],[1,0],[1,1]]);
    const target_data = tf.tensor2d([[0],[1],[1],[0]]);


    // for (let i = 1; i < 1000 ; ++i) {
    //     var h = await model.fit(training_data, target_data, {epochs: 30, verbose:0});
    //     console.log("Loss after Epoch " + i + " : " + h.history.loss[0]);
    // }

    let ws = model.getWeights()
    console.log(ws.toString())
    ws.forEach((w)=>{
        console.log(w.toString())
    })


    let pred = model.predict(training_data);
    console.log(pred.toString())

    
    model.save('file://./temp/'+model_name);
}

tr();