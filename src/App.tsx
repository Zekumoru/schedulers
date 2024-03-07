import useSjfScheduler from './hooks/useSjfScheduler';
import toSecond from './utils/toSecond';

const App = () => {
  const {
    processes,
    terminatedProcesses,
    time,
    isPaused,
    spawnProcess,
    toggle,
    isPreemptive,
    setIsPreemptive,
  } = useSjfScheduler();

  return (
    <div>
      <h1>SJF Scheduler</h1>
      <p>Time: {toSecond(time)}</p>
      <label htmlFor="is-preemptive">Preemptive?</label>
      <input
        type="checkbox"
        id="is-preemptive"
        checked={isPreemptive}
        onChange={() => setIsPreemptive(!isPreemptive)}
      />
      <button onClick={toggle}>{isPaused ? 'Play' : 'Pause'}</button>
      <button onClick={spawnProcess}>Spawn process</button>
      <h2>Processes</h2>
      <ul>
        <li>
          <span>PID</span>
          <span>Start</span>
          <span>Initial Start</span>
          <span>Duration Left</span>
          <span>Duration</span>
          <span>Status</span>
        </li>
        {!processes.length ? (
          <p>No processes.</p>
        ) : (
          processes.map(
            ({
              pid,
              start,
              initialStart,
              duration,
              status,
              initialDuration,
            }) => (
              <li key={pid}>
                <span>{pid}</span>
                <span>{toSecond(start)}</span>
                <span>{toSecond(initialStart)}</span>
                <span>{toSecond(duration)}</span>
                <span>{toSecond(initialDuration)}</span>
                <span>{status}</span>
              </li>
            )
          )
        )}
      </ul>
      <h2>Terminated Processes</h2>
      <ul>
        <li>
          <span>PID</span>
          <span>Start</span>
          <span>Ended</span>
          <span>Duration</span>
          <span>Status</span>
        </li>
        {!terminatedProcesses.length ? (
          <p>No terminated processes.</p>
        ) : (
          terminatedProcesses.map(
            ({ pid, start, initialStart, initialDuration, status }) => (
              <li key={pid}>
                <span>{pid}</span>
                <span>{toSecond(initialStart)}</span>
                <span>{toSecond(start)}</span> {/* Ended */}
                <span>{toSecond(initialDuration)}</span>
                <span>{status}</span>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
};

export default App;
