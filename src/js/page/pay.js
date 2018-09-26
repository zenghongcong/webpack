import $ from 'jquery';
import '../../css/index.css';
import { popup } from '../common/layer.js';
import { picker } from '../common/picker.js';

$('body').append('<p>支付页</p>');
picker('支付');
popup('首页');
