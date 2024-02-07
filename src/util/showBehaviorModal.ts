import Behavior from '@/services/enum/Behavior'
import { showModalPreselectTab } from 'brdgm-commons/src/util/modal/showModal'

/**
 * Show behavior modal and preselect the corresponding tab.
 * @param behavior Behavior to show
 */
export default function showBehaviorModal(behavior: Behavior) : void {
  showModalPreselectTab('rulesBehaviorModal', `tablink-behavior-${behavior}`)
}
