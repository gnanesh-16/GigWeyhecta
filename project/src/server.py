MouseController = pynput.mouse.Listener.MouseListener
Button = pynput.mouse.Listener.controller.Button
KeyboardListener = pynput.keyboard.Listener.Listener
Key = pynput.keyboard.Listener.Key
KeyCode = pynput.keyboard.Listener.KeyCode
class PreciseActionRecorder:
    """
    A comprehensive tool for recording and precisely replaying user interactions.
    
    This class captures mouse and keyboard events with high fidelity, 
    allowing for exact replication of user actions.
    """

    def __init__(
        self, 
        log_dir: str = os.path.join('C:/Users/HP/Desktop/t1/asim/appwrite', 'user_action_logs'), 
        max_events: int = 50000, 
        record_keyboard: bool = True,
        speed_multiplier: float = 5.0  # Remove configuration file support
    ):
        """
        Initialize the action recorder with configurable parameters.

        Args:
            log_dir (str): Directory to store log files
            max_events (int): Maximum number of events to record
            record_keyboard (bool): Whether to record keyboard events
        """
        self.mouse_events: List[Dict[str, Any]] = []
        self.keyboard_events: List[Dict[str, Any]] = []
        self.recording = False
        self.record_keyboard = record_keyboard
        self.max_events = max_events
        self.speed_multiplier = speed_multiplier
        self.paused = False  # Add paused state
        self.stop_replay = False  # Add stop replay flag
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO, 
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Create log directory
        os.makedirs(log_dir, exist_ok=True)
        self.log_dir = log_dir
        
        # Controllers
        self.mouse_controller = MouseController()
        self.keyboard_controller = keyboard.Controller()
        
        # Timing tracking
        self.start_time = 0

        # Modifier key states
        self.ctrl_pressed = False
        self.alt_pressed = False
        self.shift_pressed = False
    
    def _generate_log_filename(self) -> str:
        """Generate a unique log filename with timestamp."""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        return os.path.join(self.log_dir, f"user_actions_{timestamp}.json")
    
    def pause_recording(self) -> None:
        """Pause the recording."""
        self.paused = True
        self.pause_time = time.time()  # Track the time when paused
        self.logger.info("Recording paused.")
        print("Recording is being paused.")

    def resume_recording(self) -> None:
        """Resume the recording."""
        self.paused = False
        pause_duration = time.time() - self.pause_time  # Calculate the duration of the pause
        self.start_time += pause_duration  # Adjust the start time to account for the pause
        self.logger.info("Recording resumed.")
        print("Recording is being unpaused.")

    def on_move(self, x: int, y: int) -> None:
        """Record mouse movement events with precise timing."""
        if self.recording and not self.paused and len(self.mouse_events) < self.max_events:
            current_time = time.time()
            self.mouse_events.append({
                'type': 'move',
                'pos': (x, y),
                'relative_time': current_time - self.start_time,
                'screen_resolution': pyautogui.size()
            })
    
    def on_click(self, x: int, y: int, button: Button, pressed: bool) -> None:
        """Record mouse click events with precise timing and button details."""
        if self.recording and not self.paused and len(self.mouse_events) < self.max_events:
            current_time = time.time()
            self.mouse_events.append({
                'type': 'click',
                'pos': (x, y),
                'button': str(button),
                'pressed': pressed,
                'relative_time': current_time - self.start_time,
                'screen_resolution': pyautogui.size()
            })
    
    def on_scroll(self, x: int, y: int, dx: int, dy: int) -> None:
        """Record mouse scroll events with precise timing."""
        if self.recording and not self.paused and len(self.mouse_events) < self.max_events:
            current_time = time.time()
            self.mouse_events.append({
                'type': 'scroll',
                'pos': (x, y),
                'dx': dx,
                'dy': dy,
                'relative_time': current_time - self.start_time,
                'screen_resolution': pyautogui.size(),
                'trackpad': True  # Indicate trackpad scroll
            })
    
    def on_press(self, key: Key) -> Any:
        """
        Record keyboard press events.
        Stops recording if Escape key is pressed.
        """
        if key == Key.esc:
            self.stop_recording()
            return False
        if key == KeyCode(char='p'):
            if self.paused:
                self.resume_recording()
            else:
                self.pause_recording()
            return True  # Continue listening for other keys
        
        if self.recording and not self.paused and self.record_keyboard:
            current_time = time.time()
            try:
                key_name = key.char  # For regular keys
            except AttributeError:
                key_name = str(key)  # For special keys

            # Update modifier key states
            if key == Key.ctrl or key == Key.ctrl_l or key == Key.ctrl_r:
                self.ctrl_pressed = True
            elif key == Key.alt or key == Key.alt_l or key == Key.alt_r:
                self.alt_pressed = True
            elif key == Key.shift or key == Key.shift_l or key == Key.shift_r:
                self.shift_pressed = True

            # Check for Ctrl+Tab and Ctrl+Backspace combinations
            if key == Key.tab and self.ctrl_pressed:
                self.keyboard_events.append({
                    'type': 'keydown',
                    'key': 'ctrl',
                    'relative_time': current_time - self.start_time
                })
                self.keyboard_events.append({
                    'type': 'keydown',
                    'key': 'tab',
                    'relative_time': current_time - self.start_time
                })
                self.keyboard_events.append({
                    'type': 'keyup',
                    'key': 'tab',
                    'relative_time': current_time - self.start_time
                })
                self.keyboard_events.append({
                    'type': 'keyup',
                    'key': 'ctrl',
                    'relative_time': current_time - self.start_time
                })
            elif key == Key.backspace and self.ctrl_pressed:
                self.keyboard_events.append({
                    'type': 'keydown',
                    'key': 'ctrl',
                    'relative_time': current_time - self.start_time
                })
                self.keyboard_events.append({
                    'type': 'keydown',
                    'key': 'backspace',
                    'relative_time': current_time - self.start_time
                })
                self.keyboard_events.append({
                    'type': 'keyup',
                    'key': 'backspace',
                    'relative_time': current_time - self.start_time
                })
                self.keyboard_events.append({
                    'type': 'keyup',
                    'key': 'ctrl',
                    'relative_time': current_time - self.start_time
                })
            else:
                self.keyboard_events.append({
                    'type': 'keypress',
                    'key': key_name,
                    'relative_time': current_time - self.start_time
                })
    
    def on_release(self, key: Key) -> Any:
        """
        Track key release events for modifier keys.
        """
        if key == Key.ctrl or key == Key.ctrl_l or key == Key.ctrl_r:
            self.ctrl_pressed = False
        elif key == Key.alt or key == Key.alt_l or key == Key.alt_r:
            self.alt_pressed = False
        elif key == Key.shift or key == Key.shift_l or key == Key.shift_r:
            self.shift_pressed = False
        
        return True

    def _is_ctrl_pressed(self) -> bool:
        """Check if the Ctrl key is currently pressed."""
        return any([
            Key.ctrl,
            Key.ctrl_l,
            Key.ctrl_r
        ])  # Adjust based on actual modifier tracking

    def start_recording(self) -> None:
        """
        Initiate recording of user actions.
        Captures mouse and keyboard events until Escape is pressed.
        """
        self.mouse_events.clear()
        self.keyboard_events.clear()
        self.recording = True
        self.start_time = time.time()
        
        self.logger.info("Recording started. Press Esc to stop.")
        
        with MouseListener(
            on_move=self.on_move, 
            on_click=self.on_click, 
            on_scroll=self.on_scroll
        ) as mouse_listener, \
             KeyboardListener(on_press=self.on_press, on_release=self.on_release) as keyboard_listener:
            try:
                keyboard_listener.join()
            except KeyboardInterrupt:
                self.stop_recording()
            finally:
                mouse_listener.stop()
    
    def stop_recording(self) -> str:
        """
        Stop recording and save the captured actions.

        Returns:
            str: Path to the saved log file
        """
        self.recording = False
        
        if not self.mouse_events and not self.keyboard_events:
            self.logger.warning("No events to save.")
            return ""
        
        log_file = self._generate_log_filename()
        
        try:
            with open(log_file, 'w') as f:
                json.dump({
                    'mouse_events': self.mouse_events,
                    'keyboard_events': self.keyboard_events,
                    'metadata': {
                        'total_mouse_events': len(self.mouse_events),
                        'total_keyboard_events': len(self.keyboard_events),
                        'total_recording_time': self.mouse_events[-1]['relative_time'] 
                            if self.mouse_events else 0
                    }
                }, f, indent=2)
            
            self.logger.info(f"Events saved to {log_file}")
            return log_file
        except Exception as e:
            self.logger.error(f"Error saving log: {e}")
            return ""
    
    def list_recordings(self) -> List[str]:
        """List all recordings in the log directory."""
        try:
            return [f for f in os.listdir(self.log_dir) if f.endswith('.json')]
        except Exception as e:
            self.logger.error(f"Error listing recordings: {e}")
            return []

    def replay_events(self, log_file: str, precision_mode: bool = True, filter_events: List[str] = None, loop_count: int = 1) -> None:
        """
        Precisely replay recorded user actions.

        Args:
            log_file (str): Path to the JSON log file
            precision_mode (bool): If True, maintains exact timing of original actions
            filter_events (List[str]): List of event types to filter out during replay
            loop_count (int): Number of times to loop the replay (2 to 10)
        """
        try:
            with open(log_file, 'r') as f:
                log_data = json.load(f)
            
            # Combine and sort events
            all_events = []
            all_events.extend([
                {**event, 'event_type': 'mouse'} 
                for event in log_data.get('mouse_events', [])
            ])
            all_events.extend([
                {**event, 'event_type': 'keyboard'} 
                for event in log_data.get('keyboard_events', [])
            ])
            
            # Sort events by relative time
            all_events.sort(key=lambda x: x['relative_time'])
            
            # Replay events
            for _ in range(loop_count):
                if self.stop_replay:
                    self.logger.info("Replay stopped by user.")
                    print("Replay stopped by user.")
                    break
                for i, event in enumerate(all_events):
                    if self.stop_replay:
                        self.logger.info("Replay stopped by user.")
                        print("Replay stopped by user.")
                        break
                    if filter_events and event['type'] in filter_events:
                        continue
                    # Wait for the precise moment
                    if i > 0 and precision_mode:
                        wait_time = (event['relative_time'] - all_events[i-1]['relative_time'])
                        time.sleep(max(0, wait_time))
                    
                    # Handle mouse events
                    if event['event_type'] == 'mouse':
                        self._replay_mouse_event(event)
                    
                    # Handle keyboard events
                    elif event['event_type'] == 'keyboard':
                        self._replay_keyboard_event(event)
            
            self.logger.info("Replay completed successfully.")
            print("Replay completed successfully.")
        
        except FileNotFoundError:
            self.logger.error(f"Log file not found: {log_file}")
            print(f"Log file not found: {log_file}")
        except Exception as e:
            self.logger.error(f"Replay error: {e}")
            print(f"Replay error: {e}")
    
    def _replay_mouse_event(self, event: Dict[str, Any]) -> None:
        """
        Replay a specific mouse event with precise positioning and no delay.
        
        Args:
            event (Dict[str, Any]): Mouse event details
        """
        # Scale coordinates for current screen resolution
        original_resolution = event.get('screen_resolution', (1920, 1080))
        current_resolution = pyautogui.size()
        
        x, y = event['pos']
        scaled_x = int(x * (current_resolution[0] / original_resolution[0]))
        scaled_y = int(y * (current_resolution[1] / original_resolution[1]))
        
        if event['type'] == 'move':
            # Move immediately with no duration
            self.mouse_controller.position = (scaled_x, scaled_y)
        elif event['type'] == 'click':
            # Move instantly then click
            self.mouse_controller.position = (scaled_x, scaled_y)
            button = event['button'].lower()
            if 'left' in button:
                if event['pressed']:
                    pyautogui.mouseDown(scaled_x, scaled_y, button='left', duration=0)
                else:
                    pyautogui.mouseUp(scaled_x, scaled_y, button='left', duration=0)
            elif 'right' in button:
                if event['pressed']:
                    pyautogui.mouseDown(scaled_x, scaled_y, button='right', duration=0)
                else:
                    pyautogui.mouseUp(scaled_x, scaled_y, button='right', duration=0)
        elif event['type'] == 'scroll':
            if event.get('trackpad', False):
                # Simulate trackpad scroll using Shift + Space bar and Down arrow key
                self.keyboard_controller.press(Key.shift)
                self.keyboard_controller.press(Key.space)
                self.keyboard_controller.release(Key.space)
                self.keyboard_controller.release(Key.shift)
                self.keyboard_controller.press(Key.down)
                self.keyboard_controller.release(Key.down)
            else:
                pyautogui.scroll(event['dy'])

    def _replay_keyboard_event(self, event: Dict[str, Any]) -> None:
        """
        Replay a specific keyboard event with proper key simulation.
        
        Args:
            event (Dict[str, Any]): Keyboard event details
        """
        try:
            key_map = {
                'Key.shift': Key.shift,
                'Key.shift_r': Key.shift_r,
                'Key.shift_l': Key.shift_l,
                'Key.alt': Key.alt,
                'Key.alt_l': Key.alt_l,
                'Key.alt_r': Key.alt_r,
                'Key.ctrl': Key.ctrl,
                'Key.ctrl_l': Key.ctrl_l,
                'Key.ctrl_r': Key.ctrl_r,
                'Key.enter': Key.enter,
                'Key.caps_lock': Key.caps_lock,
                'Key.tab': Key.tab,
                'Key.space': Key.space,
                'Key.backspace': Key.backspace,
                'Key.delete': Key.delete,
                'Key.up': Key.up,
                'Key.down': Key.down,
                'Key.left': Key.left,
                'Key.right': Key.right,
                'Key.home': Key.home,
                'Key.end': Key.end,
                'Key.page_up': Key.page_up,
                'Key.page_down': Key.page_down,
                
                # Added mappings for 'ctrl', 'tab', and 'backspace'
                'ctrl': Key.ctrl,
                'tab': Key.tab,
                'backspace': Key.backspace,
            }

            event_type = event['type']
            key = event['key']

            if event_type == 'keydown':
                if key in key_map:
                    self.keyboard_controller.press(key_map[key])
                else:
                    self.keyboard_controller.press(key)
            elif event_type == 'keyup':
                if key in key_map:
                    self.keyboard_controller.release(key_map[key])
                else:
                    self.keyboard_controller.release(key)
            elif event_type == 'keypress':
                if key in key_map:
                    self.keyboard_controller.press(key_map[key])
                    self.keyboard_controller.release(key_map[key])
                else:
                    self.keyboard_controller.press(key)
                    self.keyboard_controller.release(key)

        except Exception as e:
            self.logger.error(f"Error replaying keyboard event: {e}")

    def stop_replay_listener(self):
        """
        Listen for the stop replay key press.
        """
        def on_press(key):
            if key == KeyCode(char='p'):
                self.stop_replay = True
                print("Replay is being stopped by user.")
                return False  # Stop listener

        with KeyboardListener(on_press=on_press) as listener:
            listener.join()

    def start_stop_hotkey_listener(self):
        """
        Start a global hotkey listener to stop the replay.
        """
        def on_activate():
            self.stop_replay = True
            print("Replay is being stopped by user.")

        hotkey = keyboard.HotKey(
            keyboard.HotKey.parse('<ctrl>+s'),
            on_activate
        )

        def for_canonical(f):
            return lambda k: f(self.listener.canonical(k))

        self.listener = keyboard.Listener(
            on_press=for_canonical(hotkey.press),
            on_release=for_canonical(hotkey.release)
        )
        self.listener.start()


app = Flask(__name__)
recorder = PreciseActionRecorder()

@app.route('/start-recording', methods=['POST'])
def start_recording(context):
    recorder.start_recording()
    if(recorder.is_recording):
        context.log("Recording started")
        return jsonify({"message": "Recording started"}), 200
    # return jsonify({"message": "Recording started"}), 200

@app.route('/stop-recording', methods=['POST'])
def start_recording(context):
    log_file = recorder.stop_recording()
    if log_file:
        with open(log_file, 'r') as f:
            data = f.read()
        # Send the JSON data to the database
        response = requests.post('https://cloud.appwrite.io/v1/databases/678134b3002fc036acbe/collections/678134bf0030cbc83f3a/documents', 
                                 headers={'Content-Type': 'application/json'},
                                 data=data)
        return jsonify({"message": "Recording stopped", "response": response.json()}), 200
    else:
        return jsonify({"message": "No events recorded"}), 400


@app.route('/replay-recording', methods=['POST'])
def start_recording():
    recorder.replay_events()
    return jsonify({"message": "Recording replaying"}), 200



if __name__ == '__main__':
    app.run()