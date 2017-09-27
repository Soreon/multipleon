/*jslint browser: true*/
/*jslint node: true */
/*global $, jQuery, alert*/

'use strict';

var c = document.getElementById("dat_canvas"),
    ctx = c.getContext("2d"),
    point_size = 3,
    min_radius = 50,
    max_radius = 340,
    min_number_of_point = 2,
    max_number_of_point = 1000,
    radius = 200,
    number_of_point = 15,
    origin_angle = (3 / 2 * Math.PI),
    center_x = c.width / 2,
    center_y = c.height / 2,
    multiple = 2,
    min_multiple = 2,
    max_multiple = 50;

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function drawCircle(ox, oy, radius, stroke) {
    ctx.beginPath();
    ctx.arc(ox, oy, radius, 0, Math.PI * 2, true);
    if (stroke) {
        ctx.stroke();
    } else {
        ctx.fill();
    }
}

/* Function des dessin des points
 * Origine du cercle placé à 3/2*PI (comme sur une horloge)
 */
function drawPoints(ox, oy, radius, number_of_points) {
    var angle, x, y, i;
    
    for (i = 0; i < number_of_points; i = i + 1) {
        angle = origin_angle + (2 * Math.PI * i / number_of_points);
        x = ox + radius * Math.cos(angle);
        y = oy + radius * Math.sin(angle);
        drawCircle(x, y, point_size, false);
        x = ox + (radius + 20) * Math.cos(angle);
        y = oy + (radius + 20) * Math.sin(angle);
        if (number_of_points < 100) {
            ctx.font = "15px Roboto";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(i, x, y);
        }
    }
}

/* Function des dessin des lignes
 * 
 */
function drawLines(ox, oy, radius, number_of_points, multiple) {
    var angle1, x1, y1, angle2, x2, y2, i;
    
    for (i = 0; i < number_of_points; i = i + 1) {
        angle1 = origin_angle + (2 * Math.PI * i / number_of_points);
        x1 = ox + radius * Math.cos(angle1);
        y1 = oy + radius * Math.sin(angle1);
        

        angle2 = origin_angle + (2 * Math.PI * ((i * multiple) % number_of_points) / number_of_points);
        x2 = ox + radius * Math.cos(angle2);
        y2 = oy + radius * Math.sin(angle2);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

// Fonction de dessin principale
function mainDrawer() {
    clearCanvas();
    drawCircle(center_x, center_y, radius, true);
    drawPoints(center_x, center_y, radius, number_of_point);
    drawLines(center_x, center_y, radius, number_of_point, multiple);
}

$(document).ready(function () {
    $("#size_slider").slider({
        min: min_radius,
        max: max_radius,
        value: radius,
        slide: function (event, ui) {
            $("#size_value").text(ui.value);
            radius = ui.value;
            mainDrawer();
        }
    });
    
    $("#point_count_slider").slider({
        min: min_number_of_point,
        max: max_number_of_point,
        value: number_of_point,
        slide: function (event, ui) {
            $("#point_count").text(ui.value);
            number_of_point = ui.value;
            mainDrawer();
        }
    });
    
    $("#multiple_slider").slider({
        min: min_multiple,
        max: max_multiple,
        value: multiple,
        slide: function (event, ui) {
            $("#multiple").text(ui.value);
            multiple = ui.value;
            mainDrawer();
        }
    });
    
    
    // Initialisation
    drawCircle(center_x, center_y, radius, true);
    $("#size_value").text(radius);
    
    drawPoints(center_x, center_y, radius, number_of_point);
    $("#point_count").text(number_of_point);
    
    drawLines(center_x, center_y, radius, number_of_point, multiple);
    $("#multiple").text(multiple);
});

