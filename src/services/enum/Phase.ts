/**
 * Phase
 */
enum Phase {
  CONFLICT = 'conflict',
  TRANSITION_LAST = 'transition-last',
  /* pendulum is not a phase, but used for mapping abilities which apply also to one of the pendulum actions */
  PENDULUM_1 = 'pendulum-1',  
  PENDULUM_2 = 'pendulum-2'
}
export default Phase
