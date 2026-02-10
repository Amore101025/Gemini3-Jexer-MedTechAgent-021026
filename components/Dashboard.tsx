import React, { useEffect, useRef, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import * as d3 from 'd3';
import { PainterStyle } from '../types';
import { Card } from './UIComponents';

// Hardcoded data based on the article for immediate "WOW" factor
const DEADLINES_DATA = [
  { name: 'EU AI Act', value: 80, date: '2025 H1' },
  { name: 'UK Framework', value: 60, date: 'Jul 2025' },
  { name: 'USA QMSR', value: 95, date: 'Feb 2026' },
  { name: 'China GB9706', value: 90, date: '2026' },
  { name: 'EU IVDR', value: 70, date: '2027' },
];

const RISK_DATA = [
  { name: 'Low Risk', value: 30 },
  { name: 'Class IIa (AI)', value: 45 },
  { name: 'High Risk', value: 25 },
];

const TALENT_DATA = [
  { month: 'Jan', supply: 4000, demand: 2400 },
  { month: 'Mar', supply: 3000, demand: 4500 }, // Gap starts
  { month: 'Jun', supply: 2000, demand: 6000 },
  { month: 'Sep', supply: 1500, demand: 7500 },
  { month: 'Dec', supply: 1000, demand: 8000 },
];

const CYBER_DATA = [
  { subject: 'SBOM', A: 120, fullMark: 150 },
  { subject: 'Threat Modeling', A: 98, fullMark: 150 },
  { subject: 'Patch Mgmt', A: 86, fullMark: 150 },
  { subject: 'Encryption', A: 99, fullMark: 150 },
  { subject: 'Auth', A: 85, fullMark: 150 },
  { subject: 'Audit Log', A: 65, fullMark: 150 },
];

const ADOPTION_TREND = [
  { year: '2023', adoption: 20, regulation: 10 },
  { year: '2024', adoption: 35, regulation: 25 },
  { year: '2025', adoption: 60, regulation: 70 }, // Regulation catches up
  { year: '2026', adoption: 85, regulation: 90 },
];

interface DashboardProps {
  styleData: PainterStyle;
  articleContent: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ styleData, articleContent }) => {
  const d3Container = useRef<HTMLDivElement>(null);
  const [dataVersion, setDataVersion] = useState(0); // To force animate

  // Simulate "Thinking" or updating graphs when article changes
  useEffect(() => {
    setDataVersion(v => v + 1);
  }, [articleContent]);

  // D3 Force Directed Graph for "Harmonization"
  useEffect(() => {
    if (!d3Container.current) return;
    
    // Clear previous
    d3.select(d3Container.current).selectAll("*").remove();

    const width = d3Container.current.clientWidth;
    const height = 300;

    const nodes = [
      { id: "Global Harmonization", group: 1 },
      { id: "FDA (USA)", group: 2 },
      { id: "MDR (EU)", group: 2 },
      { id: "NMPA (China)", group: 2 },
      { id: "ISO 13485", group: 3 },
      { id: "AI Act", group: 3 },
      { id: "IMDRF", group: 1 }
    ];

    const links = [
      { source: "FDA (USA)", target: "Global Harmonization", value: 5 },
      { source: "MDR (EU)", target: "Global Harmonization", value: 5 },
      { source: "ISO 13485", target: "FDA (USA)", value: 8 },
      { source: "AI Act", target: "MDR (EU)", value: 8 },
      { source: "IMDRF", target: "Global Harmonization", value: 10 },
      { source: "NMPA (China)", target: "Global Harmonization", value: 3 },
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(70))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(d3Container.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    const link = svg.append("g")
      .attr("stroke", styleData.textColor.includes("white") ? "#fff" : "#333")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", (d: any) => d.group === 1 ? "#ff0000" : (d.group === 2 ? "#00ff00" : "#0000ff"))
      .call(drag(simulation) as any);

    const text = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text((d: any) => d.id)
        .attr('x', 12)
        .attr('y', 4)
        .attr('font-size', '10px')
        .attr('fill', 'currentColor')
        .attr('class', styleData.textColor);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      text
          .attr("x", (d: any) => d.x + 12)
          .attr("y", (d: any) => d.y + 4);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

  }, [styleData, dataVersion]);

  // Common props
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto custom-scrollbar pb-20">
      {/* 1. Regulatory Deadlines (Bar) */}
      <Card styleData={styleData} className="min-h-[250px]">
        <h3 className="font-bold mb-2 text-center opacity-80">2026 Compliance Impact</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={DEADLINES_DATA} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={100} tick={{fill: 'currentColor', fontSize: 10}} />
            <Tooltip contentStyle={{backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 8}} />
            <Bar dataKey="value" fill={colors[0]} animationDuration={1500} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* 2. Risk Classification (Pie) */}
      <Card styleData={styleData} className="min-h-[250px]">
        <h3 className="font-bold mb-2 text-center opacity-80">AI Device Risk Mix</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={RISK_DATA}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {RISK_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* 3. Talent Gap (Area) */}
      <Card styleData={styleData} className="min-h-[250px]">
        <h3 className="font-bold mb-2 text-center opacity-80">The 2026 Talent Crunch</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={TALENT_DATA}>
            <XAxis dataKey="month" tick={{fill: 'currentColor', fontSize: 10}}/>
            <Tooltip />
            <Area type="monotone" dataKey="demand" stackId="1" stroke="#ff0000" fill="#ff7300" name="Demand" />
            <Area type="monotone" dataKey="supply" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Supply" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* 4. Cybersecurity (Radar) */}
      <Card styleData={styleData} className="min-h-[250px]">
        <h3 className="font-bold mb-2 text-center opacity-80">Cybersecurity Preparedness</h3>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={CYBER_DATA}>
            <PolarGrid stroke="currentColor" strokeOpacity={0.2} />
            <PolarAngleAxis dataKey="subject" tick={{fill: 'currentColor', fontSize: 10}} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
            <Radar name="Score" dataKey="A" stroke={colors[4]} fill={colors[4]} fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      {/* 5. Adoption vs Reg (Line) */}
      <Card styleData={styleData} className="min-h-[250px]">
        <h3 className="font-bold mb-2 text-center opacity-80">Innovation vs. Regulation</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={ADOPTION_TREND}>
            <XAxis dataKey="year" tick={{fill: 'currentColor'}}/>
            <Tooltip />
            <Line type="monotone" dataKey="adoption" stroke="#8884d8" strokeWidth={3} dot={{r: 6}} />
            <Line type="monotone" dataKey="regulation" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* 6. D3 Network Graph */}
      <Card styleData={styleData} className="min-h-[250px]">
        <h3 className="font-bold mb-2 text-center opacity-80">Regulatory Interconnections</h3>
        <div ref={d3Container} className="w-full h-[200px]" />
      </Card>
    </div>
  );
};
