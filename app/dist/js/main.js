/*!
 * LittleDashUI
 * A little UI / UX experiment.
 * @author Fred Maya
 * @version 0.1.1
 */
$(document).ready(function(){$(".btn.add-money, .drawer-close").click(function(a){$(".drawer").toggle(300),a.preventDefault()}),$(".header-notify .notifications").click(function(a){$(".notifications-view").toggleClass("is-active animated"),a.preventDefault()})});