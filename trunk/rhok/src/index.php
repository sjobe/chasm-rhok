<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" media="screen" href="css/index.css" />
<link rel="stylesheet" type="text/css" href="css/jsxgraph.css" />
<script type="text/javascript" src="lib/jsxgraphcore-readable.js"></script>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
<script type="text/javascript" src="lib/jquery.couch.js"></script>
<script type="text/javascript" src="lib/index.js"></script>
<script type="text/javascript" src="lib/login.js"></script>
<script type="text/javascript" src="lib/translate.js"></script>
<script type="text/javascript" src="lib/chasmArrayUtils.js"></script>
<script type="text/javascript" src="lib/soilGrade.js"></script>
<script type="text/javascript" src="lib/raintable.js"></script>
<script type="text/javascript" src="lib/trig.js"></script>
<script type="text/javascript" src="lib/model.js"></script>
<script type="text/javascript" src="lib/graph.js"></script>


<title>rhok - CHASM Web UI</title>
</head>
<body >
  <form id="form" action="process.php" method="post">
  <div id="page">
    
    <fieldset>
    	
    	<div id="logo"></div>
    	<div id="login">
    		<div>
    		<span><label for="infoData:user">User:</label><input id="infoData:user" name="info[user]" type="text" /></span>
    		<span><label for="infoData:password">Password:</label><input id="infoData:password" name="info[password]" type="password"/></span>
    		<span><input id="infoData:loginLogout" type="button" value="Login"/></span>
    		</div>
    	</div>
    </fieldset>
    <div id="main-col">
      <div id="tabs">
        <a href="#" class="selected first" id="info">Info</a>
        <a href="#" id="profile">Profile</a>
        <a href="#" id="soil">Soil</a>
        <a href="#" id="water">Water</a>
        <a href="#" id="rain" class="last">Rain</a>
        <div class="clear"></div>
      </div>
      <div id="tab-pages">
          <div class="tab-page selected info">
            <p>Enter the slope name and location</p>
            <table>
                <tbody id="infoData">
                <tr>
                	<th>Local File Listing</th>
                	<td>
                		<select id="infoData:fileList" disabled="disabled" name="info[fileList]">
                			 <option value="" selected="selected"></option>
                		</select>
                	</td>
                </tr>
                <tr>
                    <th scope="row">
                        Name
                    </th>
                    <td><input name="info[name]" id="infoData:name" type="text"/></td>
                </tr>
                <tr>
                    <th scope="row">
                        Latitude
                        <br/><span style="font-weight:normal; font-size:smaller;">in decimal degrees</span>
                    </th>
                    <td><input name="info[latitude]" id="infoData:latitude" type="text"/></td>
                </tr>
                <tr>
                    <th scope="row">
                        Longitude
                        <br/><span style="font-weight:normal; font-size:smaller;">in decimal degrees</span>
                    </th>
                    <td><input name="info[longitude]" id="infoData:longitude" type="text"/></td>
                </tr>
                <tr>
                    <td colspan="2" class="callout">(assume WGS84 coordinate system)</td>
                </tr>
                </tbody>
            </table>
            <div style="text-align:center; background-color: grey; width:100%; height: 300px;">
            	Map
            </div>
          </div>
          <div id="profile" class="tab-page profile">
            <p class="table-title">Enter profile segments</p>
            <div class="table-title">
              <a href="#" class="button add-profile-segment">Add New Segment</a>
              <span># segments: <span id="num-profile-segments"></span></span>
              <a href="#" style="padding:5px 10px;" class="button" onclick="render()">Refresh</a>
            </div>
            <table>
              <thead id="profile-header">
                <tr>
                  <th scope="col">Height (m)</th>
                  <th scope="col">Length (m)</th>
                  <th scope="col">Angle (degrees)</th>
                  <th scope="col"></th>
                </tr>
                <tr id="profileInitialCliff">
					<td class="height">
						<input class="computed" id="profileInitialCliff:height" name="profile[0][height]"/>
					</td>
					<td class="length">
						<input class="computed" id="profileInitialCliff:length" name="profile[0][length]"/>
					</td>
					<td class="angle">
						<input class="computed" id="profileInitialCliff:angle" name="profile[0][angle]"/>
					</td>
					<td></td>
					<td></td>
				</tr>       
              </thead>
               <tfoot id="profile-footer">
              	<tr id="profileHorizontalBoundary">
					<td class="height">
						<input class="computed" id="profileHorizontalBoundary:height" name="profile[1][height]"/>
					</td>
					<td class="length">
						<input class="computed" id="profileHorizontalBoundary:length" name="profile[1][length]"/>
					</td>
					<td class="angle">
						<input class="computed" id="profileHorizontalBoundary:angle" name="profile[1][angle]"/>
					</td>
					<td></td>
					<td></td>
				</tr>
              	<tr id="profileVerticalBoundary">
					<td class="height">
						<input class="computed" id="profileVerticalBoundary:height" name="profile[2][height]"/>
					</td>
					<td class="length">
						<input class="computed" id="profileVerticalBoundary:length" name="profile[2][length]"/>
					</td>
					<td class="angle">
						<input class="computed" id="profileVerticalBoundary:angle" name="profile[2][angle]"/>
					</td>
					<td></td>
					<td></td>
				</tr>
              </tfoot>
              <tbody id="profile-data">
              </tbody>
            </table>
          </div>
          <div id="soil" class="tab-page soil">
       	    <p class="table-title">Enter the solid strata</p>
            <div class="table-title">
              <a href="#" class="button add-soil-layer">Add New Layer</a>
              <span># layers: <span id="num-soil-layer"></span></span>
            </div>
            <table class="soil-table">
            <thead>
              <tr id="soilStrata.header">
                <th scope="col"></th>
                <th scope="col">Strata 1</th>
              </tr>
            </thead>
            <tbody id="soilStrata.type">
              <!--
              <tr>
                <td class="table-title" colspan="5">Soil Type</td>
              </tr>
              -->
              <tr id="soilStrata.type:id">
                <th scope="row">Type</th>
                <td>
                <select id="soilStrata0:type" name="soilStrata[0][type]">
                    <option value="" selected="selected"></option>
                    <option value="1">I</option>
                    <option value="2" >II</option>
                    <option value="3" >III</option>
                    <option value="4" >IV</option>
                    <option value="5" >V</option>
                    <option value="6" >VI</option>
                  </select>
                </td>
              </tr>           
              <tr id="soilStrata.type:c">
                <th scope="row">C</th>
                <td><input name="soilStrata[0][c]" id="soilStrata0:c"/></td>
              </tr>
              <tr id="soilStrata.type:phi">
                <th scope="row">phi</th>
                <td><input name="soilStrata[0][phi]" id="soilStrata0:phi"/></td>
              </tr>
              <tr id="soilStrata.type:ks">
                <th scope="row">Ks</th>
                <td><input name="soilStrata[0][ks]" id="soilStrata0:ks"/></td>
              </tr>
            </tbody>
            <tbody id="soil-header">
            </tbody>
            <tbody id="soil-tbody">
              <tr id="soil-depths">
                <td class="table-title" colspan="5">Soil Depths (m)</td>
              </tr>
            </tbody>
            <tbody id="soil-footer">
            </tbody>
            </table>
            <a href="#" style="padding:5px 10px;" class="button" onclick="renderSoil();">Render Soil</a>

          </div>
          <div class="tab-page water">
            <p class="table-title">Enter the water table depths:</p>
            <table>
              <tbody id="water-tbody">
              </tbody>
            </table>
            <a href="#" style="padding:5px 10px;" class="button" onclick="renderWaterTable();">Render Water Table</a>
            <p class="table-title">Enter Upslope Recharge:</p>
            <div onkeypress="validate(event)" class="table-title upslope-recharge"><input name="waterUpslopeRecharge" id="waterUpslopeRecharge"/></div>
            <p class="table-title">Initial Slope Suction:</p>
            <div onkeypress="validate(event)" class="table-title initial-slope-suction"><input name="waterInitialSlopeSuction" value="-0.5" id="waterInitialSlopeSuction"/></div>
          </div>
          <div class="tab-page rain">
            <p class="table-title">Chose a rainfall event:</p>
            <a style="padding:5px 10px; margin:10px 0px;" href="#" class="add-rainfall button">Add New Rainfall</a>
            <table id="rain-data" style="margin-top:10px;">
              <tr><th>Frequency (yrs)</th><th>Duration (hrs)</th><th>Volume</th><th></th></tr>
            </table>

          </div>
       </div>
    </div>
   
    <div id = "graph-col">
      <div id="graph">
      	<div id="box" class="jxgbox">
        <div style="position:absolute; left:-15px; top: 220px; -webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg); -o-transform: rotate(-90deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);font-size:0.8em; font-weight:bold;">Meters</div>
		<div style="position:absolute; left: 200px; bottom: 0px;font-size:0.8em; font-weight:bold;">Meters</div>
		<img src="img/legend.png" style="width:75px; position:absolute; top: 10px; right: 10px;"/>
        </div>
      </div>
      <div id="compute-button-holder"><input id="compute-button" class="button" type="submit" value="Create"/></div>
    </div>
    <div class="clear"></div>
  </div>
  </form>
</body>
</html>