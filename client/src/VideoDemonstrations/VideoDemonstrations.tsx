import React, { useState } from 'react';
import './VideoDemonstrations.css';

interface VideoDemonstrationsProps {
    buttonBackgroundColor: string; // Add prop for button background color
  }

const workouts = [
    { 
        id: 1,
        title: "Recumbent Bike Cycling",
        description: 'Instructional video that helps viewers learn how to effectively exercise using a recumbent bike.', 
        writtenInstructions: `Properly secure your feet in the pedals. Adjust the seat using the handle(usually located under the seat). You should be in a position such that your knee is slightly bent when the pedal is extended all the way. Grab the handle and begin pedaling while keeping your chest up. Press the start button, and adjust the resistance level as desired.`,
        category: "Cardio",
        url: 'https://www.youtube.com/embed/XugMoMDxyhM?si=E20I7QaIHkafRKvb'
    },
    { 
        id: 2,
        title: "Bench Press",
        description: 'Instructional video that helps viewers learn the correct positions and movement for the bench.', 
        writtenInstructions: `Lie down on the bench with your eyes looking straight up. Ensure that you are in a position such that when you look up, your eyes are facing the downside of the bar. Keep your feet flat on the ground and your shins approximately vertical. Your grip on the bar should be somewhere between 22 and 24 inches, measured between the index fingers. The bar should rest on the heel of your palm, not your fingers. Look up at the ceiling, and push up on the bar, locking out your elbows. Move out the bar to a position directly over the line of your shoulder joints. Lower the bar to your chest, touch your chest with the bar, and move it back up to the exact position of the ceiling you are looking up at. Repeat as many times as desired, and move the bar back to the rack afterwards.`,
        category: "Strength",
        url: 'https://www.youtube.com/embed/rxD321l2svE?si=0UzGaAAsgf6Py8jN'
    },
    { 
        id: 3,
        title: "Pilates",
        description: '5-minute full body pilates routine', 
        writtenInstructions: 'Lay down on your mat, and inhale. As you exhale, flatten your back and roll up into a bridge. Do a few pelvic curls, making sure to keep your knees straight forward and roll through your spine. Afterwards, prop the hips straight up, lower yourself about halfway down, and squeeze your glutes as you come back up. Then bring your right leg over your left leg and curl both your neck and chest up. Place both of your hands on your right knee as you stretch your left leg, and switch back and forth between legs. Then roll over onto your hands and knees, and extend one leg back while keeping yourself lifted. Pull your belly button up and in, and lift and lower yourself as many times as desired. Afterwards, rotate your body in both directions and stretch out your arms as you do so.',
        category: "Flexibility",
        url: 'https://www.youtube.com/embed/gEfnJWXEXyA?si=kqnUrvcFrme8gqSB'
    },
    { 
        id: 4,
        title: "Battle Ropes",
        description: 'Instructional video showing how to correctly use battle ropes.', 
        writtenInstructions: `Pick up the battle ropes, and position yourself such that your knees are slightly bent and your back is flat. Afterwards, quickly with your shoulders, make waves all the way down to your anchor point. Lean back on your heels as you do so.`,
        category: "Cardio",
        url: 'https://www.youtube.com/embed/d_4GHkE_44U?si=LFxGqu7qroMdXm5g'
    },
    { 
        id: 5,
        title: "Push-Ups",
        description: 'Instructional video showing how to correctly do a push-up.', 
        writtenInstructions: `Position your body and legs straight. Bring your chest down to the floor, and lower yourself down and back up. Your body should remain level and not sink. Repeat as many times as desired. `,
        category: "Strength",
        url: 'https://www.youtube.com/embed/JyCG_5l3XLk?si=ayq-U2eatdHdQ2sh'
    },
    { 
        id: 6,
        title: "Lunge Twists",
        description: 'Instructional video showing how to correctly do a lunge twist.', 
        writtenInstructions: `Stand with your feet shoulder width apart and arms stretched forward. Take a big step forward with your left leg, and lower your body until your thigh is parallel to the ground. Twist your upper body to the left, and then twist back. Return to the starting position, switch side, and repeat. Keep your knees facing forward as you twist. Keep your back straight.`,
        category: "Flexibility",
        url: 'https://www.youtube.com/embed/AVC14AUS8Gg?si=zScjURq0oh8zv_I3'
    },
    { 
        id: 7,
        title: "Running",
        description: 'Instructional video showing how to run efficiently and reduce the risk of injury.', 
        writtenInstructions: `When landing on the ground as you are running, make sure to land on your midfoot(no heel strikes). Make sure your shin is getting elevated in the back while running. Try to keep your body in a straight line and keep both your chest and chin up. As for arm movement, try to keep your elbows at a 90 degree angle as you swing your arms.`,
        category: "Cardio",
        url: 'https://www.youtube.com/embed/3RlvKMxPMr0?si=bRIAWKY-cGMtRuu4'
    },
    { 
        id: 8,
        title: "Squats",
        description: 'Instructional video showing how to correctly do a squat to improve balance, strength, and posture.', 
        writtenInstructions: `Keep your feet shoulder width apart. Your knees should be straight over your toes. As you move down, you're dropping your pelvis, and you should also ensure that your knees are moving outwards. Continue to move back up and down as many times as desired. Optionally, you can hold a weight in your hands as you perform this exercise.`,
        category: "Strength",
        url: 'https://www.youtube.com/embed/4KmY44Xsg2w?si=LxUZgnPVvj8JgtGM'
    },
    { 
        id: 9,
        title: "Butterfly Stretch",
        description: 'Instructional video showing how to correctly perform a butterfly stretch for hip mobility.', 
        writtenInstructions: 'Bring your feet so that they are facing each other. Bend your knees and push them away. Lean into it so that you are able to open up the inner thigh.',
        category: "Flexibility",
        url: 'https://www.youtube.com/embed/MdE_Cj6ChLo?si=a409gA-ruOvzi1hy'
    },
    
  ];
  
const VideoDemonstrations: React.FC<VideoDemonstrationsProps> = ({ buttonBackgroundColor }) => {
    const [selectedCategory, setSelectedCategory] = useState("Select Category");
    const [selectedWorkout, setSelectedWorkout] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [writtenInstructions, setWrittenInstructions] = useState("");

    const filteredWorkouts =
        selectedCategory === "Select Category"
        ? workouts
        : workouts.filter((workout) => workout.category === selectedCategory);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedWorkout("");
        setUrl("");
        setDescription("");
        setWrittenInstructions("");
    };

    const handleWorkoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = workouts.find((workout) => workout.title === e.target.value);
        setSelectedWorkout(e.target.value);
        if (selected) {
        setUrl(selected.url);
        setDescription(selected.description);
        setWrittenInstructions(selected.writtenInstructions);
        }
    };

    return (
        <div className="video-demonstrations-page-wrapper">
            <div className="video-demonstrations-container">
                <h1>Video Demonstrations</h1>
                    <div className="video-demonstrations-category-dropdown">
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="category-dropdown">
                            <option value="Select Category">Select Category</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Strength">Strength</option>
                            <option value="Flexibility">Flexibility</option>
                        </select>
                        <select value={selectedWorkout} onChange={handleWorkoutChange} disabled={selectedCategory === "Select Category"}>
                            <option value="">Select Workout</option>
                            {filteredWorkouts.map(workout => (
                                <option key={workout.title} value={workout.title}>{workout.title}</option>
                            ))}
                        </select>
                    </div>
                        {url && (
                            <div className="video-demonstrations-video-container">
                                <iframe 
                                width="400" 
                                height="215" 
                                src={url} 
                                title="Workout Video"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                                </iframe>
                            </div>
                            )}
                </div>
                <h3>Description of Exercise</h3>
                <textarea 
                    className="video-demonstrations-description-textarea"
                    value={description}
                    placeholder="Benefits, length, intensity, etc."
                    readOnly
                ></textarea>
                <h3>Written Instructions</h3>
                <textarea 
                    className="video-demonstrations-instructions-textarea"
                    value={writtenInstructions}
                    placeholder="Step-by-step instructions on how to complete the exercise"
                    readOnly
                ></textarea>
            </div>
    );
}

export default VideoDemonstrations;