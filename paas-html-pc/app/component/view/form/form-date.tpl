<!--日期时间选择器-->

<input type="text">

<div class="date-time-picker">
    <!--头部--年月日-->
    <div class="date-select">
        <div class="left-arrow">
            <i class="iconfont icon-left"></i>
        </div>
        <div class="y-m-d-container">
            <ul class="normal">
                <div class="row">
                    <li class="year">
                        <span>
                            <span>2016</span>
                            <span>年</span>
                        </span>

                    </li>
                    <li class="month">
                        <span>
                            <span>11</span>
                            <span>月</span>
                        </span>

                    </li>
                    <li class="day">
                        <span>
                            <span>14</span>
                            <span>日</span>
                        </span>

                    </li>
                </div>
            </ul>
        </div>
        <div class="right-arrow">
            <i class="iconfont icon-right"></i>
        </div>
    </div>
    <!--中间部分-->
    <div class="select-container">
        <div class="show year-list">
            <!--(1)正常显示的ul是normal,
                (2)点击右箭头这个ul变right,下一个要显示的ul变normal ,点左箭头同理
                -->
            <ul class="year normal">
                <!--(1)ul格式:ul>div.row>li>span
                    (2)ul里最多6行
                -->
                <div class="row">
                    <li class="year"><span>2006</span></li>
                    <li class="year"><span>2007</span></li>
                    <li class="year"><span>2008</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>2009</span></li>
                    <li class="year"><span>2010</span></li>
                    <li class="year"><span>2011</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>2012</span></li>
                    <li class="year"><span>2013</span></li>
                    <li class="year"><span>2014</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>2015</span></li>
                    <li class="year focus"><span>2016</span></li>
                    <li class="year"><span>2017</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>2018</span></li>
                    <li class="year"><span>2019</span></li>
                    <li class="year"><span>2020</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>2021</span></li>
                    <li class="year"><span>2022</span></li>
                    <li class="year"><span>2023</span></li>
                </div>

            </ul>
            <ul class="year-left">
                <div class="row">
                    <li class="year"><span>1988</span></li>
                    <li class="year"><span>1989</span></li>
                    <li class="year"><span>1990</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>1991</span></li>
                    <li class="year"><span>1992</span></li>
                    <li class="year"><span>1993</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>1994</span></li>
                    <li class="year"><span>1995</span></li>
                    <li class="year"><span>1996</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>1997</span></li>
                    <li class="year focus"><span>1998</span></li>
                    <li class="year"><span>1999</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>2000</span></li>
                    <li class="year"><span>2001</span></li>
                    <li class="year"><span>2002</span></li>
                </div>

                <div class="row">
                    <li class="year"><span>2003</span></li>
                    <li class="year"><span>2004</span></li>
                    <li class="year"><span>2005</span></li>
                </div>

            </ul>
        </div>
        <div class="month-list">
            <ul class="month normal">
                <div class="row">
                    <li class="month"><span>一月</span></li>
                    <li class="month"><span>二月</span></li>
                    <li class="month"><span>三月</span></li>
                </div>

                <div class="row">
                    <li class="month"><span>四月</span></li>
                    <li class="month"><span>五月</span></li>
                    <li class="month"><span>六月</span></li>
                </div>

                <div class="row">
                    <li class="month"><span>七月</span></li>
                    <li class="month"><span>八月</span></li>
                    <li class="month"><span>九月</span></li>
                </div>

                <div class="row">
                    <li class="month"><span>十月</span></li>
                    <li class="month focus"><span>十一月</span></li>
                    <li class="month"><span>十二月</span></li>
                </div>

            </ul>
        </div>
        <div class="day-list">
            <!--周日----周六-->
            <ul class="week normal">
                <div class="week row">
                    <li class="week"><span>日</span></li>
                    <li class="week"><span>一</span></li>
                    <li class="week"><span>二</span></li>
                    <li class="week"><span>三</span></li>
                    <li class="week"><span>四</span></li>
                    <li class="week"><span>五</span></li>
                    <li class="week"><span>六</span></li>
                </div>
            </ul>
            <!--日期-->
            <ul class="date normal">
                <div class="row">
                    <li class="prev"><span>25</span></li>
                    <li class="prev"><span>26</span></li>
                    <li class="prev"><span>27</span></li>
                    <li class="prev"><span>28</span></li>
                    <li class="prev"><span>29</span></li>
                    <li class="prev"><span>30</span></li>
                    <li class="now"><span>1</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>2</span></li>
                    <li class="now"><span>3</span></li>
                    <li class="now"><span>4</span></li>
                    <li class="now"><span>5</span></li>
                    <li class="now"><span>6</span></li>
                    <li class="now"><span>7</span></li>
                    <li class="now"><span>8</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>9</span></li>
                    <li class="now"><span>10</span></li>
                    <li class="now"><span>11</span></li>
                    <li class="now"><span>12</span></li>
                    <li class="now"><span>13</span></li>
                    <li class="now"><span>14</span></li>
                    <li class="now"><span>15</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>16</span></li>
                    <li class="now"><span>17</span></li>
                    <li class="now"><span>18</span></li>
                    <li class="now"><span>19</span></li>
                    <li class="now"><span>20</span></li>
                    <li class="now"><span>21</span></li>
                    <li class="now"><span>22</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>23</span></li>
                    <li class="now focus"><span>24</span></li>
                    <li class="now"><span>25</span></li>
                    <li class="now"><span>26</span></li>
                    <li class="now"><span>27</span></li>
                    <li class="now"><span>28</span></li>
                    <li class="now"><span>29</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>30</span></li>
                    <li class="now"><span>31</span></li>
                    <li class="next"><span>1</span></li>
                    <li class="next"><span>2</span></li>
                    <li class="next"><span>3</span></li>
                    <li class="next"><span>4</span></li>
                    <li class="next"><span>5</span></li>
                </div>
            </ul>
            <ul class="date-left">
                <div class="row">
                    <li class="prev"><span>28</span></li>
                    <li class="prev"><span>29</span></li>
                    <li class="prev"><span>30</span></li>
                    <li class="prev"><span>31</span></li>
                    <li class="now"><span>1</span></li>
                    <li class="now"><span>2</span></li>
                    <li class="now"><span>3</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>4</span></li>
                    <li class="now"><span>5</span></li>
                    <li class="now"><span>6</span></li>
                    <li class="now"><span>7</span></li>
                    <li class="now"><span>8</span></li>
                    <li class="now"><span>9</span></li>
                    <li class="now"><span>10</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>11</span></li>
                    <li class="now"><span>12</span></li>
                    <li class="now"><span>13</span></li>
                    <li class="now"><span>14</span></li>
                    <li class="now"><span>15</span></li>
                    <li class="now"><span>16</span></li>
                    <li class="now"><span>17</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>18</span></li>
                    <li class="now"><span>19</span></li>
                    <li class="now"><span>20</span></li>
                    <li class="now"><span>21</span></li>
                    <li class="now"><span>22</span></li>
                    <li class="now"><span>23</span></li>
                    <li class="now focus"><span>24</span></li>
                </div>

                <div class="row">
                    <li class="now"><span>25</span></li>
                    <li class="now"><span>26</span></li>
                    <li class="now"><span>27</span></li>
                    <li class="now"><span>28</span></li>
                    <li class="now"><span>29</span></li>
                    <li class="now"><span>30</span></li>
                    <li class="next"><span>1</span></li>
                </div>

                <div class="row">
                    <li class="next"><span>2</span></li>
                    <li class="next"><span>3</span></li>
                    <li class="next"><span>4</span></li>
                    <li class="next"><span>5</span></li>
                    <li class="next"><span>6</span></li>
                    <li class="next"><span>7</span></li>
                    <li class="next"><span>8</span></li>
                </div>
            </ul>
        </div>
        <div class="hour-list">
            <ul class="hour normal">
                <div class="row">
                    <li class="hour"><span>1</span></li>
                    <li class="hour"><span>2</span></li>
                    <li class="hour"><span>3</span></li>
                    <li class="hour"><span>4</span></li>
                </div>

                <div class="row">
                    <li class="hour"><span>5</span></li>
                    <li class="hour"><span>6</span></li>
                    <li class="hour"><span>7</span></li>
                    <li class="hour"><span>8</span></li>
                </div>

                <div class="row">
                    <li class="hour"><span>9</span></li>
                    <li class="hour"><span>10</span></li>
                    <li class="hour"><span>11</span></li>
                    <li class="hour"><span>12</span></li>
                </div>

                <div class="row">
                    <li class="hour"><span>13</span></li>
                    <li class="hour"><span>14</span></li>
                    <li class="hour"><span>15</span></li>
                    <li class="hour"><span>16</span></li>
                </div>

                <div class="row">
                    <li class="hour"><span>17</span></li>
                    <li class="hour"><span>18</span></li>
                    <li class="hour"><span>19</span></li>
                    <li class="hour"><span>20</span></li>
                </div>

                <div class="row">
                    <li class="hour"><span>21</span></li>
                    <li class="hour"><span>22</span></li>
                    <li class="hour"><span>23</span></li>
                    <li class="hour"><span>0</span></li>
                </div>


            </ul>
        </div>
        <div class="minute-list">
            <ul class="minute normal">
                <div class="row">
                    <li class="minute"><span>0</span></li>
                    <li class="minute focus"><span>1</span></li>
                    <li class="minute"><span>2</span></li>
                    <li class="minute"><span>3</span></li>
                    <li class="minute"><span>4</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>5</span></li>
                    <li class="minute"><span>6</span></li>
                    <li class="minute"><span>7</span></li>
                    <li class="minute"><span>8</span></li>
                    <li class="minute"><span>9</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>10</span></li>
                    <li class="minute"><span>11</span></li>
                    <li class="minute"><span>12</span></li>
                    <li class="minute"><span>13</span></li>
                    <li class="minute"><span>14</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>15</span></li>
                    <li class="minute"><span>16</span></li>
                    <li class="minute"><span>17</span></li>
                    <li class="minute"><span>18</span></li>
                    <li class="minute"><span>19</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>20</span></li>
                    <li class="minute"><span>21</span></li>
                    <li class="minute"><span>22</span></li>
                    <li class="minute"><span>23</span></li>
                    <li class="minute"><span>24</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>25</span></li>
                    <li class="minute"><span>26</span></li>
                    <li class="minute"><span>27</span></li>
                    <li class="minute"><span>28</span></li>
                    <li class="minute"><span>29</span></li>
                </div>
            </ul>
            <ul class="minute-left">
                <div class="row">
                    <li class="minute"><span>30</span></li>
                    <li class="minute"><span>31</span></li>
                    <li class="minute"><span>32</span></li>
                    <li class="minute"><span>33</span></li>
                    <li class="minute"><span>34</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>35</span></li>
                    <li class="minute"><span>36</span></li>
                    <li class="minute"><span>37</span></li>
                    <li class="minute"><span>38</span></li>
                    <li class="minute"><span>39</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>40</span></li>
                    <li class="minute"><span>41</span></li>
                    <li class="minute"><span>42</span></li>
                    <li class="minute"><span>43</span></li>
                    <li class="minute"><span>44</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>45</span></li>
                    <li class="minute"><span>46</span></li>
                    <li class="minute"><span>47</span></li>
                    <li class="minute"><span>48</span></li>
                    <li class="minute"><span>49</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>50</span></li>
                    <li class="minute"><span>51</span></li>
                    <li class="minute"><span>52</span></li>
                    <li class="minute"><span>53</span></li>
                    <li class="minute"><span>54</span></li>
                </div>

                <div class="row">
                    <li class="minute"><span>55</span></li>
                    <li class="minute"><span>56</span></li>
                    <li class="minute"><span>57</span></li>
                    <li class="minute"><span>58</span></li>
                    <li class="minute"><span>59</span></li>
                </div>
            </ul>
        </div>
        <div class="second-list">
            <ul class="normal second">
                <div class="row">
                    <li class="second focus"><span>0</span></li>
                    <li class="second"><span>1</span></li>
                    <li class="second"><span>2</span></li>
                    <li class="second"><span>3</span></li>
                    <li class="second"><span>4</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>5</span></li>
                    <li class="second"><span>6</span></li>
                    <li class="second"><span>7</span></li>
                    <li class="second"><span>8</span></li>
                    <li class="second"><span>9</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>10</span></li>
                    <li class="second"><span>11</span></li>
                    <li class="second"><span>12</span></li>
                    <li class="second"><span>13</span></li>
                    <li class="second"><span>14</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>15</span></li>
                    <li class="second"><span>16</span></li>
                    <li class="second"><span>17</span></li>
                    <li class="second"><span>18</span></li>
                    <li class="second"><span>19</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>20</span></li>
                    <li class="second"><span>21</span></li>
                    <li class="second"><span>22</span></li>
                    <li class="second"><span>23</span></li>
                    <li class="second"><span>24</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>25</span></li>
                    <li class="second"><span>26</span></li>
                    <li class="second"><span>27</span></li>
                    <li class="second"><span>28</span></li>
                    <li class="second"><span>29</span></li>
                </div>
            </ul>
            <ul class="second-left">
                <div class="row">
                    <li class="second"><span>30</span></li>
                    <li class="second"><span>31</span></li>
                    <li class="second"><span>32</span></li>
                    <li class="second"><span>33</span></li>
                    <li class="second"><span>34</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>35</span></li>
                    <li class="second"><span>36</span></li>
                    <li class="second"><span>37</span></li>
                    <li class="second"><span>38</span></li>
                    <li class="second"><span>39</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>40</span></li>
                    <li class="second"><span>41</span></li>
                    <li class="second"><span>42</span></li>
                    <li class="second"><span>43</span></li>
                    <li class="second"><span>44</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>45</span></li>
                    <li class="second"><span>46</span></li>
                    <li class="second"><span>47</span></li>
                    <li class="second"><span>48</span></li>
                    <li class="second"><span>49</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>50</span></li>
                    <li class="second"><span>51</span></li>
                    <li class="second"><span>52</span></li>
                    <li class="second"><span>53</span></li>
                    <li class="second"><span>54</span></li>
                </div>
                <div class="row">
                    <li class="second"><span>55</span></li>
                    <li class="second"><span>56</span></li>
                    <li class="second"><span>57</span></li>
                    <li class="second"><span>58</span></li>
                    <li class="second"><span>59</span></li>
                </div>
            </ul>
        </div>
    </div>
    <!--尾部--时间-->
    <div class="time-select">
        <div class="time-title"><strong>时间：</strong></div>
        <div class="h-m-s-container">
            <ul class="normal">
                <div class="row">
                    <li class="hour">
                        <span>
                            <span class="hour-val">18</span>
                            <span>时</span>
                        </span>
                    </li>
                    <li class="minute">
                        <span>
                            <span>22</span>
                            <span>分</span>
                        </span>
                    </li>
                    <li class="second">
                        <span>
                            <span>30</span>
                            <span>秒</span>
                        </span>
                    </li>
                </div>
            </ul>
        </div>
        <div class="btn-group-me">
            <button class="btn">确定</button>
        </div>

    </div>
</div>
